import { useEffect, useId, useRef, type ReactNode } from "react";
import { VintageBorder } from "../decor/VintageBorder";

type RsvpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function RsvpModal({ isOpen, onClose, title, children }: RsvpModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    contentRef.current?.scrollTo({ top: 0 });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [children]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Закрыть форму"
        className="absolute inset-0 bg-chocolate/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden border border-wine/25 bg-cream shadow-[0_24px_60px_rgba(61,46,42,0.18)]"
      >
        <VintageBorder
          className="flex min-h-0 flex-1 flex-col"
          innerClassName="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex shrink-0 items-start justify-between gap-4">
            <p
              id={titleId}
              className="font-serif text-2xl text-wine sm:text-3xl"
            >
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="mt-1 font-sans text-xs tracking-[0.2em] text-wine/70 uppercase transition-colors hover:text-wine"
            >
              ✕
            </button>
          </div>

          <div
            ref={contentRef}
            className="mt-6 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
          >
            {children}
          </div>
        </VintageBorder>
      </div>
    </div>
  );
}
