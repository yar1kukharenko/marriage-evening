import { useState, type FormEvent } from "react";
import { rsvp } from "../../data/content";
import { RsvpSubmitError, submitRsvp } from "../../lib/rsvp";
import {
  hasFieldErrors,
  validateRsvpForm,
  type RsvpFieldErrors,
} from "../../lib/validateRsvp";
import type { RsvpFormData, TransferOption } from "../../types/rsvp";

type RsvpFormProps = {
  onSuccess: () => void;
};

type FormState = RsvpFormData & {
  attendingChoice: "yes" | "no" | "";
  transferChoice: TransferOption | "";
};

const initialState: FormState = {
  fullName: "",
  attending: false,
  transfer: null,
  phone: "",
  comment: "",
  attendingChoice: "",
  transferChoice: "",
};

const fieldClassName =
  "w-full border bg-cream px-4 py-3 font-sans text-sm text-chocolate outline-none transition-colors placeholder:text-chocolate/40 focus:border-wine/60";

const labelClassName =
  "block font-sans text-xs tracking-[0.15em] text-wine/80 uppercase";

function fieldBorderClass(hasError: boolean) {
  return `${fieldClassName} ${hasError ? "border-wine" : "border-wine/25"}`;
}

export function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<RsvpFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedAttending, setSubmittedAttending] = useState(false);

  const isAttending = form.attendingChoice === "yes";

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      if (key in next) delete next[key as keyof RsvpFieldErrors];
      return next;
    });
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const errors = validateRsvpForm(form);
    if (hasFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    const payload: RsvpFormData = {
      fullName: form.fullName.trim(),
      attending: isAttending,
      transfer:
        isAttending && form.transferChoice ? form.transferChoice : null,
      phone: form.phone,
      comment: form.comment,
    };

    setIsSubmitting(true);

    try {
      await submitRsvp(payload);
      setSubmittedAttending(isAttending);
      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      const message =
        error instanceof RsvpSubmitError
          ? error.message
          : rsvp.form.errors.submit;
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 pb-1 text-center">
        <p className="font-serif text-xl text-wine">{rsvp.form.successTitle}</p>
        <p className="font-serif text-base text-chocolate/85">
          {submittedAttending
            ? rsvp.form.successMessageAttending
            : rsvp.form.successMessageDeclined}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-1 text-left">
      <div className="space-y-2">
        <label htmlFor="rsvp-fullName" className={labelClassName}>
          {rsvp.form.fields.fullName}
        </label>
        <input
          id="rsvp-fullName"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={form.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
          placeholder={rsvp.form.placeholders.fullName}
          className={fieldBorderClass(Boolean(fieldErrors.fullName))}
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={
            fieldErrors.fullName ? "rsvp-fullName-error" : undefined
          }
        />
        {fieldErrors.fullName && (
          <p id="rsvp-fullName-error" className="font-sans text-sm text-wine">
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>{rsvp.form.fields.attending}</legend>
        <div className="space-y-2">
          {rsvp.form.attendingOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-start gap-3 font-serif text-base text-chocolate/90"
            >
              <input
                type="radio"
                name="attending"
                value={option.value}
                checked={form.attendingChoice === option.value}
                onChange={() => {
                  updateField("attendingChoice", option.value);
                  updateField("attending", option.value === "yes");
                  if (option.value === "no") {
                    updateField("transferChoice", "");
                    updateField("transfer", null);
                  }
                }}
                className="mt-1 accent-wine"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.attending && (
          <p className="font-sans text-sm text-wine">{fieldErrors.attending}</p>
        )}
      </fieldset>

      {isAttending && (
        <fieldset className="space-y-3">
          <legend className={labelClassName}>{rsvp.form.fields.transfer}</legend>
          <div className="space-y-2">
            {rsvp.form.transferOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 font-serif text-base text-chocolate/90"
              >
                <input
                  type="radio"
                  name="transfer"
                  value={option.value}
                  checked={form.transferChoice === option.value}
                  onChange={() => {
                    updateField("transferChoice", option.value);
                    updateField("transfer", option.value);
                  }}
                  className="mt-1 accent-wine"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {fieldErrors.transfer && (
            <p className="font-sans text-sm text-wine">{fieldErrors.transfer}</p>
          )}
        </fieldset>
      )}

      <div className="space-y-2">
        <label htmlFor="rsvp-phone" className={labelClassName}>
          {rsvp.form.fields.phone}
        </label>
        <input
          id="rsvp-phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder={rsvp.form.placeholders.phone}
          className={fieldBorderClass(Boolean(fieldErrors.phone))}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "rsvp-phone-error" : undefined}
        />
        {fieldErrors.phone && (
          <p id="rsvp-phone-error" className="font-sans text-sm text-wine">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="rsvp-comment" className={labelClassName}>
          {rsvp.form.fields.comment}
        </label>
        <textarea
          id="rsvp-comment"
          rows={3}
          maxLength={500}
          value={form.comment}
          onChange={(event) => updateField("comment", event.target.value)}
          placeholder={rsvp.form.placeholders.comment}
          className={`${fieldBorderClass(Boolean(fieldErrors.comment))} resize-none`}
          aria-invalid={Boolean(fieldErrors.comment)}
          aria-describedby={
            fieldErrors.comment ? "rsvp-comment-error" : undefined
          }
        />
        {fieldErrors.comment && (
          <p id="rsvp-comment-error" className="font-sans text-sm text-wine">
            {fieldErrors.comment}
          </p>
        )}
      </div>

      {submitError && (
        <p className="font-sans text-sm text-wine" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-wine/60 px-8 py-3 font-sans text-xs tracking-[0.25em] text-wine uppercase transition-colors duration-300 hover:bg-wine hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? rsvp.form.submittingLabel : rsvp.form.submitLabel}
      </button>
    </form>
  );
}
