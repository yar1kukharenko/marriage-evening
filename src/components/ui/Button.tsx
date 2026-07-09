import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const buttonClassName =
  "inline-block select-none touch-manipulation border border-wine/60 px-8 py-3 font-sans text-xs tracking-[0.25em] text-wine uppercase transition-[color,background-color,transform] duration-200 hover:bg-wine hover:text-cream active:scale-[0.98] active:bg-wine/90 active:text-cream disabled:cursor-not-allowed disabled:border-wine/20 disabled:bg-chocolate/[0.03] disabled:text-wine/35 disabled:hover:bg-chocolate/[0.03] disabled:hover:text-wine/35 disabled:active:scale-100";

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
