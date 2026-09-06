import Link from "next/link";
import { cn } from "@formify/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-full px-5 py-2.5",
    "text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
    {
      "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover":
        variant === "primary",

      "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-muted":
        variant === "secondary",

      "text-text-secondary hover:text-foreground": variant === "ghost",
    },
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} type="button">
      {children}
    </button>
  );
}
