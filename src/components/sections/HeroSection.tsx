import { hero } from "../../data/content";
// import { Arch } from "../decor/Arch";
import { HeroVines } from "../decor/HeroVines";
import { Section } from "../layout/Section";

export function HeroSection() {
  return (
    <Section id="hero" decor={<HeroVines />} className="text-center">
      {/* <Arch className="mx-auto mb-1 h-24 w-72 sm:h-28 sm:w-80" /> */}

      <div className="mt-2 font-serif text-sm leading-snug text-chocolate/80">
        {hero.greeting.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <h1 className="mt-6 font-script text-5xl leading-[0.95] text-wine sm:text-6xl">
        <span className="block">{hero.names[0]}</span>
        <span className="block font-serif text-2xl leading-none italic text-wine/75 sm:text-3xl">
          и
        </span>
        <span className="block">{hero.names[1]}</span>
      </h1>

      <div className="mt-7 flex items-center justify-center gap-4 font-sans text-xs tracking-[0.25em] text-chocolate/70 uppercase leading-none">
        <span className="h-px w-8 bg-gold/60" />
        <span>{hero.date}</span>
        <span className="h-px w-8 bg-gold/60" />
      </div>

      <p className="mt-1 font-sans text-xs tracking-[0.2em] text-chocolate/60 uppercase leading-snug">
        {hero.meeting}
      </p>
    </Section>
  );
}
