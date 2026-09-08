import Link from "next/link";
import type { ReactNode } from "react";
import { AuthBrandPanel } from "../components/ui/AuthBrandPanel";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-svh overflow-hidden bg-background p-4 sm:p-5">
      <div
        className="
          relative mx-auto grid h-full max-w-5xl overflow-hidden
          rounded-[24px]
          border border-border
          bg-surface
          shadow-[0_16px_50px_rgba(33,29,37,0.07)]
          sm:grid-cols-[0.85fr_1.15fr]
        "
      >
        <AuthBrandPanel />

        {/* Back to home */}
        <Link
          href="/"
          className="
            absolute right-5 top-5 z-20
            inline-flex items-center gap-1.5
            rounded-full
            border border-border
            bg-surface/90
            px-3 py-1.5
            text-xs font-medium
            text-text-secondary
            backdrop-blur-sm
            transition-all
            hover:border-border-strong
            hover:bg-background
            hover:text-foreground
          "
        >
          <span className="text-sm">←</span>
          Back to home
        </Link>

        <section className="min-h-0 min-w-0 overflow-hidden bg-surface">
          {children}
        </section>
      </div>
    </main>
  );
}
