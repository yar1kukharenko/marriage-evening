import { transfer } from "../../data/content";
import { TransferGarland } from "../decor/TransferGarland";
import { Section } from "../layout/Section";

export function TransferSection() {
  return (
    <Section id="transfer" compact className="text-center">
      <TransferGarland className="mb-8" />
      <p className="font-sans text-xs tracking-[0.3em] text-wine/80 uppercase">
        {transfer.title}
      </p>
      <p className="mt-6 font-serif text-lg text-chocolate/90">
        {transfer.description}
      </p>

      <div className="mt-8 space-y-3 font-sans text-sm text-chocolate/80">
        <p>
          <span className="tracking-[0.15em] text-wine uppercase">
            Отъезд гостей:
          </span>{" "}
          {transfer.departureTime}
        </p>
        <p>
          <span className="tracking-[0.15em] text-wine uppercase">
            Место сбора:
          </span>
        </p>
        <p>{transfer.meetingPoint}</p>
        <p>{transfer.address}</p>
      </div>

      <p className="mt-8 font-serif text-base text-chocolate/80 italic">
        {transfer.note}
      </p>
    </Section>
  );
}
