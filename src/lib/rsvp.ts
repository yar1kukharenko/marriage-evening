import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { RsvpFormData } from "../types/rsvp";
import { db, isFirebaseConfigured } from "./firebase";

export class RsvpSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RsvpSubmitError";
  }
}

export async function submitRsvp(data: RsvpFormData): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new RsvpSubmitError(
      "Firebase не настроен. Добавьте переменные VITE_FIREBASE_* в файл .env",
    );
  }

  await addDoc(collection(db, "rsvps"), {
    fullName: data.fullName.trim(),
    attending: data.attending,
    transfer: data.attending ? data.transfer : null,
    phone: data.phone.trim() || null,
    comment: data.comment.trim() || null,
    createdAt: serverTimestamp(),
  });
}
