import { mapUrl, photos, venue } from "../../data/content";
import { VintageBorder } from "../decor/VintageBorder";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { VintagePhoto } from "../ui/VintagePhoto";

export function VenueSection() {
  return (
    <Section id="venue" compact className="text-center">
      <VintageBorder>
        <VintagePhoto
          {...photos.venue}
          aspect="landscape"
          className="mb-6"
        />
        <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
          {venue.title}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-chocolate">
          {venue.name}
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-chocolate/80">
          {venue.description}
        </p>
        <div className="mt-8">
          <Button href={mapUrl}>{venue.mapButtonLabel}</Button>
        </div>
      </VintageBorder>
    </Section>
  );
}
