import { dressCode, type DressCodeImage } from "../../data/content";
import { Section } from "../layout/Section";

const paletteRows = [
  dressCode.palette.slice(0, 5),
  dressCode.palette.slice(5, 9),
];

const stopListRows = [
  dressCode.stopList.items.slice(0, 3),
  dressCode.stopList.items.slice(3),
];

type ImageGridProps = {
  label: string;
  items: DressCodeImage[];
  columns?: string;
  itemClassName?: string;
  captionClassName?: string;
  className?: string;
};

function ImageGrid({
  label,
  items,
  columns = "grid-cols-5",
  itemClassName = "max-w-14 sm:max-w-16",
  captionClassName = "font-serif text-[9px] leading-tight text-chocolate/70 italic sm:text-[10px]",
  className = "",
}: ImageGridProps) {
  return (
    <div className={`mt-10 ${className}`}>
      <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
        {label}
      </p>
      <div className={`mt-6 grid justify-items-center gap-2 ${columns}`}>
        {items.map((item) => (
          <div
            key={item.src}
            className={`flex w-full flex-col gap-1 ${itemClassName}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="photo-vintage h-auto w-full rounded-sm object-contain"
            />
            {item.caption && (
              <p className={captionClassName}>{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DressCodeSection() {
  return (
    <Section id="dress-code" wide compact className="text-center">
      <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
        {dressCode.title}
      </p>
      <p className="mt-6 font-serif text-base text-chocolate/90">
        {dressCode.intro}
      </p>

      <div className="mt-8 space-y-5">
        {paletteRows.map((row) => (
          <div
            key={row.map((color) => color.hex).join("-")}
            className="flex justify-center gap-5 sm:gap-8"
          >
            {row.map((color) => (
              <span
                key={color.hex}
                className="h-12 w-12 shrink-0 rounded-full border border-gold/50 transition-transform hover:scale-110 sm:h-14 sm:w-14"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
            ))}
          </div>
        ))}
      </div>

      <ImageGrid
        label={dressCode.references.label}
        items={dressCode.references.items}
        columns="grid-cols-5"
        itemClassName="max-w-16 sm:max-w-20"
        className="mt-8"
      />

      <ImageGrid
        label={dressCode.textures.label}
        items={dressCode.textures.items}
        columns="grid-cols-4"
        itemClassName="max-w-20 sm:max-w-24"
      />

      <div className="mt-10">
        <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
          {dressCode.stopList.label}
        </p>
        <div className="mt-6 space-y-4">
          {stopListRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-6 sm:gap-8"
            >
              {row.map((item) => (
                <div
                  key={item.src}
                  className="flex max-w-28 flex-col items-center gap-2 sm:max-w-36"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="photo-vintage h-auto w-full rounded-full object-contain"
                  />
                  {item.caption && (
                    <p className="font-serif text-sm leading-snug text-chocolate/90 italic sm:text-base">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
