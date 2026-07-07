import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const buttonClassName =
  "inline-block border border-wine/60 px-8 py-3 font-sans text-xs tracking-[0.25em] text-wine uppercase transition-colors duration-300 hover:bg-wine hover:text-cream disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Ghost-кнопка в винтажном стиле: тонкая рамка, uppercase, без заливки.
 * Поддерживает как ссылку, так и действие (например, открытие попапа).
 */
export function Button({
  href,
  onClick,
  children,
  external = true,
  type = "button",
  disabled = false,
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={buttonClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      {children}
    </button>
  );
}
