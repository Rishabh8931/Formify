import { Container } from "@/app/components/layout/Container";

export function ProductShowcase() {
  return (
    <section id="product" className="relative py-20 sm:py-32">
      <Container>
        {/* Section intro */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
            The Formify builder
          </p>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            Everything you need to build.
            <br />
            <span className="font-script font-normal text-primary">
              Nothing you don&apos;t.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg">
            A focused workspace that keeps form building simple, flexible, and
            fast.
          </p>
        </div>

        {/* Product */}
        <div className="mt-14 sm:mt-20">
          <div className="overflow-hidden rounded-[24px] border border-border bg-surface">
            {/* Top bar */}
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <div className="flex items-center gap-3">
                <div className="font-script text-xl text-primary">formify</div>

                <div className="hidden h-5 w-px bg-border sm:block" />

                <span className="hidden text-sm text-text-secondary sm:block">
                  Customer feedback
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-muted">
                  Preview
                </button>

                <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-hover">
                  Publish
                </button>
              </div>
            </div>

            {/* Workspace */}
            <div className="grid min-h-[520px] lg:grid-cols-[220px_1fr_260px]">
              {/* Left sidebar */}
              <aside className="hidden border-r border-border bg-surface-muted/40 p-4 lg:block">
                <p className="px-2 text-[11px] font-medium uppercase tracking-widest text-text-tertiary">
                  Fields
                </p>

                <div className="mt-4 space-y-1">
                  {[
                    "Short text",
                    "Email",
                    "Long text",
                    "Multiple choice",
                    "Checkboxes",
                  ].map((field) => (
                    <button
                      key={field}
                      className="flex w-full items-center rounded-lg px-2.5 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <span className="mr-2 text-text-tertiary">+</span>
                      {field}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Canvas */}
              <main className="bg-background p-6 sm:p-10 lg:p-14">
                <div className="mx-auto max-w-xl">
                  <div className="mb-10">
                    <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                      Customer feedback
                    </span>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      How was your experience?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      Your feedback helps us make Formify better.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Selected field */}
                    <div className="rounded-xl border border-primary/40 bg-surface p-4 ring-1 ring-primary/10">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                          Your name
                        </label>

                        <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                          Selected
                        </span>
                      </div>

                      <div className="rounded-lg border border-border bg-background px-3.5 py-3 text-sm text-text-tertiary">
                        Enter your name
                      </div>
                    </div>

                    {/* Another field */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        How would you rate us?
                      </label>

                      <div className="flex gap-2">
                        {["1", "2", "3", "4", "5"].map((rating) => (
                          <div
                            key={rating}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary"
                          >
                            {rating}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add field */}
                    <div className="rounded-xl border border-dashed border-border-strong py-4 text-center text-sm text-text-tertiary">
                      + Add field
                    </div>
                  </div>
                </div>
              </main>

              {/* Settings */}
              <aside className="hidden border-l border-border bg-surface p-5 lg:block">
                <p className="text-[11px] font-medium uppercase tracking-widest text-text-tertiary">
                  Field settings
                </p>

                <div className="mt-6">
                  <label className="text-xs font-medium text-text-secondary">
                    Label
                  </label>

                  <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground">
                    Your name
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-xs font-medium text-text-secondary">
                    Placeholder
                  </label>

                  <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-tertiary">
                    Enter your name
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Required</span>

                  <div className="flex h-5 w-9 items-center rounded-full bg-primary px-1">
                    <div className="ml-auto h-3.5 w-3.5 rounded-full bg-white" />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
