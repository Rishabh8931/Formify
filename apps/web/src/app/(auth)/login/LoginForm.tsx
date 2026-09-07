"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginSchema } from "@formify/utils";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    form?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [remember, setRemember] = useState(false);

  /**
   * Handle login form submission
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Clear previous error
    setErrors({});

    /**
     * ----------------------------------------
     * Client-side validation
     * ----------------------------------------
     */

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setErrors({
        form: result.error.issues[0]?.message ?? "Invalid login details.",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * ----------------------------------------
       * Better Auth login
       * ----------------------------------------
       */

      const { error } = await authClient.signIn.email({
        email: result.data.email,
        password: result.data.password,

        /**
         * Keep the session longer when the user
         * chooses "Remember me".
         *
         * Better Auth uses this to determine
         * whether the session should be persistent.
         */
        rememberMe: remember,

        /**
         * Destination after successful login.
         */
        callbackURL: "/dashboard",
      });

      /**
       * ----------------------------------------
       * Better Auth error
       * ----------------------------------------
       */

      if (error) {
        setErrors({
          form: error.message || "Invalid email or password.",
        });

        return;
      }

      /**
       * ----------------------------------------
       * Successful login
       * ----------------------------------------
       *
       * Better Auth has created the session/cookie.
       *
       * Now navigate to the protected dashboard.
       */

      router.push("/dashboard");

      /**
       * Refresh server components so that
       * server-side session checks see the
       * newly authenticated user.
       */
      router.refresh();
    } catch {
      /**
       * Unexpected/network error
       */
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* General form error */}

            {errors.form && (
              <div
                role="alert"
                aria-live="polite"
                className="
                  rounded-xl
                  border border-danger/20
                  bg-danger/5
                  px-4 py-3
                  text-sm
                  text-danger
                "
              >
                {errors.form}
              </div>
            )}

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
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  /**
                   * Clear the general error when
                   * the user starts correcting input.
                   */
                  if (errors.form) {
                    setErrors({});
                  }
                }}
                disabled={isSubmitting}
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

                  disabled:cursor-not-allowed
                  disabled:opacity-60
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
                  className="
                    text-xs font-medium
                    text-primary
                    transition-colors
                    hover:text-primary-hover
                  "
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
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (errors.form) {
                    setErrors({});
                  }
                }}
                disabled={isSubmitting}
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

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Remember */}

            <label
              htmlFor="remember"
              className="
                flex cursor-pointer
                items-center gap-2
                pt-1
              "
            >
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                disabled={isSubmitting}
                className="
                  h-4 w-4
                  rounded
                  border-border
                  accent-primary
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <span className="text-xs text-text-secondary">Remember me</span>
            </label>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex h-11 w-full
                items-center justify-center
                rounded-xl
                bg-primary
                text-sm font-medium
                text-white
                transition-all

                hover:-translate-y-px
                hover:bg-primary-hover

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {isSubmitting ? (
                <>
                  <span
                    className="
                      mr-2
                      h-4 w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <span className="ml-2 text-base">→</span>
                </>
              )}
            </button>
          </form>

          {/* Signup */}

          <div className="mt-7 border-t border-border pt-6 text-center">
            <p className="text-sm text-text-secondary">
              {"Don't"} have an account?{" "}
              <Link
                href="/signup"
                className="
                  font-medium
                  text-primary
                  transition-colors
                  hover:text-primary-hover
                "
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
