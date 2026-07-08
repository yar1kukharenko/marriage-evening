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
