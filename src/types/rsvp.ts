export type TransferOption = "bus" | "self";

export type RsvpFormData = {
  fullName: string;
  attending: boolean;
  transfer: TransferOption | null;
  phone: string;
  comment: string;
};

export type RsvpRecord = {
  fullName: string;
  attending: boolean;
  transfer: TransferOption | null;
  phone: string | null;
  comment: string | null;
  createdAt: ReturnType<typeof import("firebase/firestore").serverTimestamp>;
};
