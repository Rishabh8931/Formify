import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6">
      <nav
        className="
          mx-auto flex h-14 max-w-6xl items-center justify-between
          rounded-[18px]
          border border-border/80
          bg-background/85
          px-4
          backdrop-blur-md
          sm:px-5
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            font-script
            text-[25px]
            leading-none
            tracking-wide
            text-primary
          "
        >
          formify
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 text-sm font-medium text-text-secondary md:flex">
          <Link
            href="#product"
            className="transition-colors hover:text-foreground"
          >
            Product
          </Link>

          <Link
            href="#problem"
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

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="
              hidden rounded-full
              px-3.5 py-2
              text-sm font-medium
              text-text-secondary
              transition-colors
              hover:text-foreground
              sm:block
            "
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="
              rounded-full
              bg-primary
              px-4 py-2
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
      </nav>
    </header>
  );
}
