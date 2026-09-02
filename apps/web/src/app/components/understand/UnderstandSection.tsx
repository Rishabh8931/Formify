import { Container } from "@/app/components/layout/Container";

export function UnderstandSection() {
  return (
    <section className="bg-surface-muted py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              Understand
            </p>

            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
              Responses are where
              <br />
              the form becomes
              <span className="ml-2 font-script font-normal text-primary">
                valuable.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-text-secondary sm:text-lg">
              Collect responses in one place and turn the information people
              share through your forms into something you can actually work
              with.
            </p>
          </div>

          {/* Response preview */}
          <div className="rounded-[24px] border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                  Responses
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  Customer feedback
                </p>
              </div>

              <span className="text-xs text-text-tertiary">
                Recent responses
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Alex</p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    alex@example.com
                  </p>
                </div>

                <p className="hidden text-sm text-text-secondary sm:block">
                  Very easy to use.
                </p>

                <span className="text-xs text-text-tertiary">Today</span>
              </div>

              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Sam</p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    sam@example.com
                  </p>
                </div>

                <p className="hidden text-sm text-text-secondary sm:block">
                  Clean and straightforward.
                </p>

                <span className="text-xs text-text-tertiary">Yesterday</span>
              </div>

              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Jordan</p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    jordan@example.com
                  </p>
                </div>

                <p className="hidden text-sm text-text-secondary sm:block">
                  The form was simple to complete.
                </p>

                <span className="text-xs text-text-tertiary">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
