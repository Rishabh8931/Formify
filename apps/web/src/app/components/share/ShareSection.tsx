import { Container } from "@/app/components/layout/Container";

export function ShareSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Product visual */}
          <div className="order-2 lg:order-1">
            <div className="rounded-[24px] border border-border bg-surface p-5 shadow-sm sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
                    Share form
                  </p>

                  <p className="mt-1 text-sm font-medium text-foreground">
                    Customer feedback
                  </p>
                </div>

                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                  Ready
                </span>
              </div>

              {/* Share area */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">
                  Your form is ready to share
                </p>

                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  Share your form with the people you want to hear from.
                </p>

                {/* Link */}
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-background p-2">
                  <div className="min-w-0 flex-1 truncate px-2 text-sm text-text-secondary">
                    formify.app/f/customer-feedback
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Copy
                  </button>
                </div>

                {/* Share options */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium text-foreground">
                      Share link
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-tertiary">
                      Give people a direct way to open your form.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium text-foreground">
                      Form preview
                    </p>

                    <p className="mt-1 text-xs leading-5 text-text-tertiary">
                      Check the experience before sharing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 max-w-xl lg:order-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              Share
            </p>

            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
              From blank canvas to
              <br />
              <span className="font-script font-normal text-primary">
                shared form.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-text-secondary sm:text-lg">
              Once your form is ready, put it in front of the people you want to
              hear from and start collecting responses.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
