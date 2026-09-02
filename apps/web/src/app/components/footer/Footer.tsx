import Link from "next/link";
import { Container } from "@/app/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-script text-[28px] leading-none tracking-wide text-primary"
            >
              formify
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-text-secondary">
              Build forms people actually finish.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
              Product
            </p>

            <div className="mt-5 flex flex-col items-start gap-3 text-sm text-text-secondary">
              <Link
                href="#product"
                className="transition-colors hover:text-foreground"
              >
                Product
              </Link>

              <Link
                href="#solutions"
                className="transition-colors hover:text-foreground"
              >
                Solutions
              </Link>

              <Link
                href="#pricing"
                className="transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
              Account
            </p>

            <div className="mt-5 flex flex-col items-start gap-3 text-sm text-text-secondary">
              <Link
                href="/login"
                className="transition-colors hover:text-foreground"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="transition-colors hover:text-foreground"
              >
                Start building
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Formify. All rights reserved.</p>

          <p>Build something people want to complete.</p>
        </div>
      </Container>
    </footer>
  );
}
