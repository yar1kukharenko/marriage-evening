import { useState } from "react";
import { rsvp } from "../../data/content";
import { Section } from "../layout/Section";
import { RsvpForm } from "../rsvp/RsvpForm";
import { RsvpModal } from "../rsvp/RsvpModal";
import { Button } from "../ui/Button";

export function RsvpSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Section id="rsvp" compact className="text-center">
        <p className="font-serif text-3xl text-wine">{rsvp.title}</p>
        <p className="mt-6 font-serif text-base text-chocolate/90">
          Пожалуйста, подтвердите, сможете&nbsp;ли вы&nbsp;быть с&nbsp;нами, до{" "}
          <span className="font-medium text-wine">{rsvp.deadline}</span>.
        </p>

        <p className="mt-6 font-sans text-sm text-chocolate/80">
          При подтверждении также сообщите, пожалуйста:
        </p>
        <ul className="mt-4 space-y-2 font-serif text-base text-chocolate/90">
          {rsvp.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-10">
          <Button onClick={() => setIsModalOpen(true)} external={false}>
            {rsvp.buttonLabel}
          </Button>
        </div>
      </Section>

      <RsvpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={rsvp.form.title}
      >
        <RsvpForm onSuccess={() => undefined} />
      </RsvpModal>
    </>
  );
}
