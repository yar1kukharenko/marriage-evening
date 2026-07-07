import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="relative mx-auto min-h-screen max-w-2xl overflow-x-hidden bg-cream sm:shadow-[0_0_60px_rgba(61,46,42,0.08)]">
      <div className="relative z-10">{children}</div>
    </main>
  );
}
