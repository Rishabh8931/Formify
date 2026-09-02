import Link from "next/link";
import { Container } from "@/app/components/layout/Container";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-surface-muted py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
            Pricing
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
            Simple pricing.
            <br />
            <span className="font-script font-normal text-primary">
              No unnecessary complexity.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Choose the plan that fits how you want to build and use Formify.
            Start with the option that works for you and upgrade when you need
            more.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[28px] border border-border bg-surface p-8 text-center sm:p-12">
          <p className="text-sm font-medium text-text-secondary">
            Ready to build?
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Start building with Formify.
          </h3>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
            Create your first form and see how the builder fits your workflow.
          </p>

          <Link
            href="/signup"
            className="
              mt-7 inline-flex items-center
              rounded-full
              bg-primary
              px-5 py-2.5
              text-sm font-medium
              text-white
              transition-all
              hover:-translate-y-px
              hover:bg-primary-hover
            "
          >
            Start building
            <span className="ml-1.5">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
