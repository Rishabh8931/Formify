import { Container } from "@/app/components/layout/Container";
import { Button } from "@/app/components/ui/Buttons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40" id="hero">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
            Form builder, reimagined
          </p>

          {/* Heading */}
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
            Build forms people{" "}
            <span className="font-script font-normal tracking-normal text-primary">
              actually
            </span>{" "}
            finish.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Create beautiful, powerful forms without wrestling with complicated
            builders. Build, share, collect, and understand responses — all in
            one place.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/signup">
              Start building — it&apos;s free
              <span>→</span>
            </Button>

            <Button href="#product" variant="ghost">
              See how it works
              <span>→</span>
            </Button>
          </div>

          {/* Reassurance */}
          <p className="mt-4 text-xs text-text-tertiary">
            No credit card required · Free to get started
          </p>
        </div>

        {/* Product preview */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[24px] border border-border bg-surface shadow-[0_30px_80px_rgba(33,29,37,0.10)]">
              {/* Browser / app header */}
              <div className="flex h-12 items-center border-b border-border px-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                </div>

                <div className="mx-auto text-xs font-medium text-text-tertiary">
                  Untitled form
                </div>

                <div className="text-xs text-success">Saved</div>
              </div>

              {/* Builder */}
              <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[1fr_280px]">
                {/* Canvas */}
                <div className="bg-background p-8 sm:p-12">
                  <div className="mx-auto max-w-xl">
                    <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                      Contact form
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                      Tell us a little about yourself
                    </h2>

                    <div className="mt-8 space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          Your name
                        </label>

                        <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-tertiary">
                          Enter your name
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          Email address
                        </label>

                        <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-tertiary">
                          you@example.com
                        </div>
                      </div>

                      <div className="rounded-xl border border-dashed border-border-strong px-4 py-4 text-center text-sm text-text-tertiary">
                        + Add field
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <aside className="hidden border-l border-border bg-surface p-5 lg:block">
                  <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                    Field settings
                  </p>

                  <div className="mt-6">
                    <label className="text-xs font-medium text-text-secondary">
                      Label
                    </label>

                    <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                      Your name
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      Required
                    </span>

                    <div className="flex h-5 w-9 items-center rounded-full bg-primary px-1">
                      <div className="ml-auto h-3.5 w-3.5 rounded-full bg-white" />
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
