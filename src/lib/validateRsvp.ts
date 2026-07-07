import { rsvp } from "../data/content";
import type { TransferOption } from "../types/rsvp";

export type RsvpFieldErrors = {
  fullName?: string;
  attending?: string;
  transfer?: string;
  phone?: string;
  comment?: string;
};

const FULL_NAME_MIN = 2;
const FULL_NAME_MAX = 100;
const PHONE_MAX = 30;
const COMMENT_MAX = 500;

const fullNamePattern = /^[\p{L}\s'-]+$/u;
const phonePattern = /^[\d\s+()-]+$/;

export function validateRsvpForm(data: {
  fullName: string;
  attendingChoice: "yes" | "no" | "";
  transferChoice: TransferOption | "";
  phone: string;
  comment: string;
}): RsvpFieldErrors {
  const errors: RsvpFieldErrors = {};
  const fullName = data.fullName.trim();

  if (!fullName) {
    errors.fullName = rsvp.form.errors.fullName;
  } else if (fullName.length < FULL_NAME_MIN) {
    errors.fullName = rsvp.form.errors.fullNameTooShort;
  } else if (fullName.length > FULL_NAME_MAX) {
    errors.fullName = rsvp.form.errors.fullNameTooLong;
  } else if (!fullNamePattern.test(fullName)) {
    errors.fullName = rsvp.form.errors.fullNameInvalid;
  }

  if (!data.attendingChoice) {
    errors.attending = rsvp.form.errors.attending;
  }

  if (data.attendingChoice === "yes" && !data.transferChoice) {
    errors.transfer = rsvp.form.errors.transfer;
  }

  const phone = data.phone.trim();
  if (phone) {
    if (phone.length > PHONE_MAX) {
      errors.phone = rsvp.form.errors.phoneTooLong;
    } else if (!phonePattern.test(phone)) {
      errors.phone = rsvp.form.errors.phoneInvalid;
    } else {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        errors.phone = rsvp.form.errors.phoneInvalid;
      }
    }
  }

  if (data.comment.length > COMMENT_MAX) {
    errors.comment = rsvp.form.errors.commentTooLong;
  }

  return errors;
}

export function hasFieldErrors(errors: RsvpFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
