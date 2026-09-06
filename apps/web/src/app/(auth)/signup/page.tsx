"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signupSchema } from "@formify/utils";
import { authClient } from "@/lib/auth-client";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
  form?: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent duplicate submissions.
    if (isSubmitting) return;

    setErrors({});

    const result = signupSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field === "name" || field === "email" || field === "password") {
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
      }

      if (!termsAccepted) {
        fieldErrors.terms = "You must accept the Terms of Service.";
      }

      setErrors(fieldErrors);
      return;
    }

    if (!termsAccepted) {
      setErrors({
        terms: "You must accept the Terms of Service.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
        callbackURL: "/dashboard",
      });

      if (error) {
        console.error("Signup error:", error);
        setErrors({
          form: error.message || "Unable to create your account.",
        });

        return;
      }

      router.push("/dashboard");
    } catch {
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors((current) => ({
                      ...current,
                      name: undefined,
                    }));
                  }
                }}
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`
                  mt-1.5 h-10.5 w-full rounded-xl
                  border bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:ring-2
                  ${
                    errors.name
                      ? "border-danger focus:border-danger focus:ring-danger/10"
                      : "border-border focus:border-primary focus:ring-primary/10"
                  }
                `}
              />

              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                >
                  <span aria-hidden="true">!</span>
                  {errors.name}
                </p>
              )}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors((current) => ({
                      ...current,
                      email: undefined,
                    }));
                  }
                }}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`
                  mt-1.5 h-10.5 w-full rounded-xl
                  border bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:ring-2
                  ${
                    errors.email
                      ? "border-danger focus:border-danger focus:ring-danger/10"
                      : "border-border focus:border-primary focus:ring-primary/10"
                  }
                `}
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                >
                  <span aria-hidden="true">!</span>
                  {errors.email}
                </p>
              )}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }
                }}
                autoComplete="new-password"
                placeholder="Create a strong password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`
                  mt-1.5 h-10.5 w-full rounded-xl
                  border bg-background
                  px-3.5
                  text-sm text-foreground
                  outline-none
                  placeholder:text-text-tertiary
                  transition
                  focus:ring-2
                  ${
                    errors.password
                      ? "border-danger focus:border-danger focus:ring-danger/10"
                      : "border-border focus:border-primary focus:ring-primary/10"
                  }
                `}
              />

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                >
                  <span aria-hidden="true">!</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  name="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);

                    if (errors.terms) {
                      setErrors((current) => ({
                        ...current,
                        terms: undefined,
                      }));
                    }
                  }}
                  className={`
                    mt-0.5 h-4 w-4 shrink-0 rounded
                    accent-primary
                    ${errors.terms ? "border-danger" : "border-border"}
                  `}
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

              {errors.terms && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                  <span aria-hidden="true">!</span>
                  {errors.terms}
                </p>
              )}
            </div>

            {/* General error */}
            {errors.form && (
              <div
                role="alert"
                className="rounded-xl border border-danger/20 bg-danger/5 px-3.5 py-2.5 text-xs text-danger"
              >
                {errors.form}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
    flex h-11 w-full items-center justify-center
    rounded-xl
    bg-primary
    text-sm font-medium text-white
    transition-all
    hover:-translate-y-px
    hover:bg-primary-hover
    active:translate-y-0
    disabled:cursor-not-allowed
    disabled:opacity-70
"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="
          mr-2 h-4 w-4
          animate-spin
          rounded-full
          border-2
          border-white/30
          border-t-white
        "
                    aria-hidden="true"
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span className="ml-2 text-base">→</span>
                </>
              )}
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
