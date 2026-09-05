import Link from "next/link";

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-primary p-8 text-inverse-text sm:flex sm:flex-col lg:p-10">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary-soft/20 blur-3xl" />

      {/* Brand */}
      <Link
        href="/"
        className="relative z-10 w-fit font-script text-3xl tracking-wide text-white"
      >
        formify
      </Link>

      {/* Main copy */}
      <div className="relative z-10 mt-auto">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-xl text-accent">✦</span>

          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            Build better
          </span>
        </div>

        <h2 className="max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white lg:text-5xl">
          Forms that
          <br />
          <span className="text-white/90">people actually</span>
          <br />
          <span className="font-script font-normal text-accent">
            want to complete.
          </span>
        </h2>

        <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">
          Build, share, and understand forms without making the experience feel
          like paperwork.
        </p>

        {/* Mini product preview */}
        <div className="relative mt-10">
          <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />

          <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                  Feedback survey
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  How was your experience?
                </p>
              </div>

              <span className="rounded-lg bg-accent/15 px-2 py-1 text-xs text-accent">
                + Add
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5">
              <div className="h-2 w-24 rounded-full bg-white/20" />
              <div className="mt-2 h-2 w-40 rounded-full bg-white/10" />
            </div>

            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-accent"
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="max-w-sm text-sm leading-6 text-white/65">
            “Simplicity is the ultimate sophistication.”
          </p>

          <p className="mt-2 font-script text-base text-accent">
            — Leonardo da Vinci
          </p>
        </div>
      </div>
    </aside>
  );
}
