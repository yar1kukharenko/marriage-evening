import { dressCode, photos } from "../../data/content";
import { Section } from "../layout/Section";
import { VintagePhoto } from "../ui/VintagePhoto";

const paletteRows = [
  dressCode.palette.slice(0, 3),
  dressCode.palette.slice(3, 5),
  dressCode.palette.slice(5, 7),
];

export function DressCodeSection() {
  return (
    <Section id="dress-code" wide compact className="text-center">
      <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
        {dressCode.title}
      </p>
      <p className="mt-6 font-serif text-base text-chocolate/90">
        {dressCode.intro}
      </p>

      <div className="mt-8 space-y-6">
        {paletteRows.map((row) => (
          <div
            key={row.map((color) => color.name).join("-")}
            className="flex justify-center gap-6 sm:gap-10"
          >
            {row.map((color) => (
              <div
                key={color.name}
                className="flex w-[72px] flex-col items-center gap-2 sm:w-20"
              >
                <span
                  className="h-9 w-9 shrink-0 rounded-full border border-gold/50 transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <span className="text-center font-sans text-[10px] leading-tight tracking-[0.08em] text-chocolate/70 uppercase sm:text-[11px] sm:tracking-[0.1em]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        {photos.dressCode.map((photo) => (
          <VintagePhoto
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            aspect="portrait"
            variant="illustration"
          />
        ))}
      </div>

      <p className="mt-10 font-serif text-sm text-chocolate/70 italic">
        {dressCode.avoidNote}
      </p>
    </Section>
  );
}
