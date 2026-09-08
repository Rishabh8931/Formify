import { Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your forms.
        </p>
      </div>

      <Link
        href="/forms/new"
        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <Plus className="size-4" />
        Create form
      </Link>
    </div>
  );
}
