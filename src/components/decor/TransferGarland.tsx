import transferGarland from "../../assets/decor/transfer-garland-640.webp";

type TransferGarlandProps = {
  className?: string;
};

/**
 * Горизонтальная ботаническая гирлянда для секции трансфера.
 */
export function TransferGarland({ className = "" }: TransferGarlandProps) {
  return (
    <img
      src={transferGarland}
      alt=""
      aria-hidden="true"
      className={`mx-auto h-14 w-full max-w-[220px] object-contain opacity-[0.55] sm:h-16 sm:max-w-[260px] sm:opacity-70 ${className}`}
    />
  );
}
