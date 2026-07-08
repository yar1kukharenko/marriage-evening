import manifest from "../data/image-manifest.json";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export type ResponsiveImageData = {
  src: string;
  srcSet: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
};

type ManifestEntry = {
  widths: number[];
  defaultWidth: number;
  width: number;
  height: number;
};

const entries = manifest as Record<string, ManifestEntry>;

export function responsiveImage(
  key: string,
  alt: string,
  sizes = "100vw",
): ResponsiveImageData {
  const entry = entries[key];

  if (!entry) {
    throw new Error(`Missing optimized image manifest entry: ${key}`);
  }

  const directory = key.includes("/") ? key.slice(0, key.lastIndexOf("/")) : "";
  const fileName = key.slice(key.lastIndexOf("/") + 1);
  const basePath = directory ? `${directory}/${fileName}` : fileName;

  const srcSet = entry.widths
    .map((width) => `${asset(`${basePath}-${width}.webp`)} ${width}w`)
    .join(", ");

  return {
    src: asset(`${basePath}-${entry.defaultWidth}.webp`),
    srcSet,
    sizes,
    width: entry.width,
    height: entry.height,
    alt,
  };
}
