import { Container } from "@/app/components/layout/Container";

export function ProblemSection() {
  return (
    <section className="bg-background py-24 sm:py-32" id="problem">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          {/* Heading */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              The problem
            </p>

            <h2 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
              Forms shouldn&apos;t feel like
              <span className="font-script ml-2 font-normal text-primary">
                paperwork.
              </span>
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-lg lg:ml-auto">
            <p className="text-base leading-7 text-text-secondary sm:text-lg">
              Most form builders make you choose between simplicity and control.
              Too many settings, too many clicks, and too little attention to
              the experience your users actually have.
            </p>

            <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg">
              Formify takes a different approach: give you the tools you need,
              then get out of the way.
            </p>
          </div>
        </div>

        {/* Problems */}
        <div className="mt-16 grid border-t border-border sm:grid-cols-3">
          <div className="border-b border-border py-7 sm:border-b-0 sm:border-r sm:pr-8">
            <span className="text-sm font-medium text-primary">01</span>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              Too complicated
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Simple forms shouldn&apos;t require learning a complicated
              interface.
            </p>
          </div>

          <div className="border-b border-border py-7 sm:border-b-0 sm:border-r sm:px-8">
            <span className="text-sm font-medium text-primary">02</span>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              Poor experiences
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              The builder should help you create forms people enjoy completing.
            </p>
          </div>

          <div className="py-7 sm:pl-8">
            <span className="text-sm font-medium text-primary">03</span>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              Lost in the data
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Collecting responses is easy. Turning them into useful insight is
              the hard part.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
