"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="mb-8 text-center sm:hidden">
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
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
            Log in to your
            <br />
            <span className="font-script font-normal text-primary">
              Formify account.
            </span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
            Continue building beautiful forms and turning responses into useful
            insights.
          </p>
        </div>

        {/* Form */}
        <div className="mt-7">
          <form className="space-y-4">
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
                  mt-2 h-11 w-full rounded-xl
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="
                  mt-2 h-11 w-full rounded-xl
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

            {/* Remember */}
            <label className="flex cursor-pointer items-center gap-2 pt-1">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-border accent-primary"
              />

              <span className="text-xs text-text-secondary">Remember me</span>
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
              Log in
              <span className="ml-2 text-base">→</span>
            </button>
          </form>

          {/* Signup */}
          <div className="mt-7 border-t border-border pt-6 text-center">
            <p className="text-sm text-text-secondary">
              {"Don't"} have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
