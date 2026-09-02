import { Container } from "@/app/components/layout/Container";

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="border-y border-border bg-surface py-14 sm:py-16"
    >
      <Container>
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
            Built for people who care about the experience
          </p>

          {/* Proof items */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
            <span className="text-sm font-medium text-text-secondary">
              Simple
            </span>

            <span className="h-1 w-1 rounded-full bg-border-strong" />

            <span className="text-sm font-medium text-text-secondary">
              Fast
            </span>

            <span className="h-1 w-1 rounded-full bg-border-strong" />

            <span className="text-sm font-medium text-text-secondary">
              Beautiful
            </span>

            <span className="h-1 w-1 rounded-full bg-border-strong" />

            <span className="text-sm font-medium text-text-secondary">
              Powerful
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
