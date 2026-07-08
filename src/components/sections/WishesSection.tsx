import { photos, wishes } from "../../data/content";
import { VintageBorder } from "../decor/VintageBorder";
import { Section } from "../layout/Section";
import { VintagePhoto } from "../ui/VintagePhoto";

export function WishesSection() {
  return (
    <Section id="wishes" compact className="text-center">
      <VintageBorder>
        <VintagePhoto
          {...photos.wishes}
          aspect="landscape"
          variant="illustration"
          className="mb-6"
        />
        <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
          {wishes.title}
        </p>
        <div className="mt-6 space-y-3 font-serif text-lg leading-snug text-chocolate/90 sm:text-xl">
          {wishes.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </VintageBorder>
    </Section>
  );
}
