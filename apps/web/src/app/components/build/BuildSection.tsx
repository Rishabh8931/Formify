import { Container } from "@/app/components/layout/Container";

export function BuildSection() {
  return (
    <section className="bg-surface-muted py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              Build
            </p>

            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
              Everything you need.
              <br />
              <span className="font-script font-normal text-primary">
                Nothing you don&apos;t.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-text-secondary sm:text-lg">
              Create your form by adding the fields you need and configuring
              them from one focused workspace.
            </p>
          </div>

          {/* Product visual */}
          <div className="rounded-[24px] border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-sm font-medium text-foreground">
                Form fields
              </span>

              <span className="text-xs text-success">Saved</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-primary/30 bg-primary-soft/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Name
                  </span>

                  <span className="text-xs text-text-tertiary">Short text</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Email
                  </span>

                  <span className="text-xs text-text-tertiary">Email</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    How did you hear about us?
                  </span>

                  <span className="text-xs text-text-tertiary">
                    Multiple choice
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-xl border border-dashed border-border-strong py-4 text-sm text-text-tertiary transition-colors hover:border-primary hover:text-primary"
              >
                + Add field
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
