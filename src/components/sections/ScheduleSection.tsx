import { schedule } from "../../data/content";
import { ScheduleVine } from "../decor/ScheduleVine";
import { Section } from "../layout/Section";
// import { VintagePhoto } from "../ui/VintagePhoto";

export function ScheduleSection() {
  return (
    <Section id="schedule" compact className="text-center">
      <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
        {schedule.title}
      </p>

      <div className="relative mt-10 text-left">
        <ScheduleVine />
        <div>
          {schedule.items.map((item, index) => (
            <div
              key={item.time}
              className="flex gap-5 pb-8 text-left last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-gold bg-cream" />
                {index < schedule.items.length - 1 && (
                  <span className="w-px flex-1 bg-gold/40" />
                )}
              </div>
              <div>
                <p className="font-sans text-sm tracking-[0.15em] text-wine">
                  {item.time}
                </p>
                <p className="mt-1 font-serif text-lg text-chocolate/90">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="hidden w-36 shrink-0 sm:block">
          <VintagePhoto
            src={photos.schedule.src}
            alt={photos.schedule.alt}
            aspect="portrait"
          />
        </div> */}
      </div>

      {/* <div className="mt-8 sm:hidden">
        <VintagePhoto
          src={photos.schedule.src}
          alt={photos.schedule.alt}
          aspect="landscape"
          className="max-w-xs mx-auto"
        />
      </div> */}
    </Section>
  );
}
