import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {Record<string, { widths: number[]; defaultWidth: number; width: number; height: number }>} */
const manifest = {};

/**
 * @param {{
 *   dir: string;
 *   widths: number[];
 *   defaultWidth: number;
 *   quality: number;
 *   pattern: RegExp;
 *   removeOriginal?: boolean;
 * }} config
 */
async function optimizeDirectory(config) {
  const absoluteDir = path.join(root, config.dir);
  let entries;

  try {
    entries = await fs.readdir(absoluteDir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (!config.pattern.test(entry)) continue;
    if (/-\d+\.webp$/.test(entry)) continue;

    const inputPath = path.join(absoluteDir, entry);
    const baseName = entry.replace(/\.(jpe?g|png)$/i, "");
    const manifestKey = path.posix.join(
      config.dir.replace(/^public\//, "").replace(/^src\/assets\//, "assets/"),
      baseName,
    );
    const metadata = await sharp(inputPath).metadata();
    const sourceWidth = metadata.width ?? config.defaultWidth;
    const widths = config.widths.filter((width) => width <= sourceWidth);
    const targetWidths =
      widths.length > 0 ? widths : [Math.min(sourceWidth, config.defaultWidth)];

    let defaultMeta = null;

    for (const width of targetWidths) {
      const outputName = `${baseName}-${width}.webp`;
      const outputPath = path.join(absoluteDir, outputName);

      const output = await sharp(inputPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: config.quality, effort: 6 })
        .toBuffer({ resolveWithObject: true });

      await fs.writeFile(outputPath, output.data);

      if (width === config.defaultWidth || !defaultMeta) {
        defaultMeta = {
          width: output.info.width,
          height: output.info.height,
        };
      }
    }

    if (!defaultMeta) {
      throw new Error(`Failed to optimize ${inputPath}`);
    }

    manifest[manifestKey] = {
      widths: targetWidths,
      defaultWidth: config.defaultWidth,
      width: defaultMeta.width,
      height: defaultMeta.height,
    };

    if (config.removeOriginal !== false) {
      await fs.unlink(inputPath);
    }
  }
}

/**
 * Собирает данные для манифеста из уже существующих WebP-файлов формата
 *   <basename>-<width>.webp
 * Это позволяет восстанавливать/обновлять манифест, даже если исходные JPG/PNG уже удалены.
 *
 * @param {{
 *   dir: string;
 *   defaultWidth: number;
 * }} config
 */
async function collectManifestFromWebp(config) {
  const absoluteDir = path.join(root, config.dir);
  let entries;

  try {
    entries = await fs.readdir(absoluteDir);
  } catch {
    return;
  }

  /** @type {Map<string, { widths: number[]; samplePath: string }>} */
  const groups = new Map();

  for (const entry of entries) {
    const match = entry.match(/^(.*)-(\d+)\.webp$/);
    if (!match) continue;

    const baseName = match[1];
    const width = Number(match[2]);
    if (!Number.isFinite(width)) continue;

    const manifestKey = path.posix.join(
      config.dir.replace(/^public\//, "").replace(/^src\/assets\//, "assets/"),
      baseName,
    );

    let group = groups.get(manifestKey);
    if (!group) {
      group = {
        widths: [],
        samplePath: path.join(absoluteDir, entry),
      };
      groups.set(manifestKey, group);
    }

    group.widths.push(width);

    // Если это размер по умолчанию — используем его как образец для метаданных.
    if (width === config.defaultWidth) {
      group.samplePath = path.join(absoluteDir, entry);
    }
  }

  for (const [manifestKey, group] of groups) {
    group.widths.sort((a, b) => a - b);

    const meta = await sharp(group.samplePath).metadata();
    const width = meta.width ?? group.widths[group.widths.length - 1];
    const height = meta.height ?? width; // запасной вариант, если высота неизвестна

    manifest[manifestKey] = {
      widths: group.widths,
      defaultWidth: config.defaultWidth,
      width,
      height,
    };
  }
}

async function createOgImage() {
  const sourcePath = path.join(
    root,
    "public/illustrations/couple-garden-walk-1024.webp",
  );

  try {
    await fs.access(sourcePath);
  } catch {
    return;
  }

  const outputPath = path.join(root, "public/illustrations/couple-garden-walk-og.jpg");
  await sharp(sourcePath)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);
}

async function main() {
  // 1. Генерация/обновление WebP и манифеста из исходников,
  //    если в папках ещё остались JPG/PNG.
  await optimizeDirectory({
    dir: "public/photos",
    widths: [480, 768, 1024],
    defaultWidth: 768,
    quality: 80,
    pattern: /\.(jpe?g|png)$/i,
  });

  await optimizeDirectory({
    dir: "public/illustrations",
    widths: [640, 1024],
    defaultWidth: 768,
    quality: 82,
    pattern: /\.(jpe?g|png)$/i,
  });

  await optimizeDirectory({
    dir: "public/examples",
    widths: [256],
    defaultWidth: 256,
    quality: 78,
    pattern: /\.png$/i,
  });

  await optimizeDirectory({
    dir: "src/assets/decor",
    widths: [640],
    defaultWidth: 640,
    quality: 82,
    pattern: /\.png$/i,
    removeOriginal: true,
  });

  await createOgImage();

  // 2. Поверх этого собираем манифест из уже существующих WebP-файлов.
  //    Это гарантирует, что после первого прогона (когда исходники удалены)
  //    манифест всё равно восстанавливается полностью.
  await collectManifestFromWebp({
    dir: "public/photos",
    defaultWidth: 768,
  });

  await collectManifestFromWebp({
    dir: "public/illustrations",
    defaultWidth: 768,
  });

  await collectManifestFromWebp({
    dir: "public/examples",
    defaultWidth: 256,
  });

  const manifestPath = path.join(root, "src/data/image-manifest.json");
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
