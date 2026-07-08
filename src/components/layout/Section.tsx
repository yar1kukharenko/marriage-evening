import { useEffect, useRef, useState, type ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  wide?: boolean;
  compact?: boolean;
  decor?: ReactNode;
  children: ReactNode;
};

/**
 * Обёртка для каждого из 7 экранов: центрирует контент и мягко проявляет его
 * при попадании в область видимости.
 */
export function Section({
  id,
  className = "",
  wide = false,
  compact = false,
  decor,
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`fade-in relative flex w-full items-center justify-center px-6 ${
        compact ? "min-h-0 py-14" : "min-h-[90vh] py-16"
      } ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {decor}
      <div className={`relative w-full ${wide ? "max-w-lg" : "max-w-md"}`}>
        {children}
      </div>
    </section>
  );
}
