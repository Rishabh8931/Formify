"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-7 sm:px-10 lg:px-16">
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="mb-7 text-center sm:hidden">
          <Link
            href="/"
            className="font-script text-3xl tracking-wide text-primary"
          >
            formify
          </Link>
        </div>

        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Get started
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
            Create your
            <br />
            <span className="font-script font-normal text-primary">
              Formify account.
            </span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
            Start building forms that connect with people and get better
            responses.
          </p>
        </div>

        {/* Form */}
        <div className="mt-6">
          <form className="space-y-3.5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className="
                  mt-1.5 h-10.5 w-full rounded-xl
                  border border-border
                  bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="
                  mt-1.5 h-10.5 w-full rounded-xl
                  border border-border
                  bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                className="
                  mt-1.5 h-10.5 w-full rounded-xl
                  border border-border
                  bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 pt-1">
              <input
                type="checkbox"
                name="terms"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
              />

              <span className="text-xs leading-5 text-text-secondary">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="
                flex h-11 w-full items-center justify-center
                rounded-xl
                bg-primary
                text-sm font-medium text-white
                transition-all
                hover:-translate-y-px
                hover:bg-primary-hover
                active:translate-y-0
              "
            >
              Create account
              <span className="ml-2 text-base">→</span>
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 border-t border-border pt-5 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
