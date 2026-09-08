import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { FormRow } from "./form-row";

type RecentForm = {
  id: string;
  title: string;
  status: "draft" | "published";
  responseCount: number;
  updatedAt: string;
};

type RecentFormsProps = {
  forms?: RecentForm[];
};

export function RecentForms({ forms = [] }: RecentFormsProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold">Recent forms</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your recently updated forms.
          </p>
        </div>

        <Link
          href="/dashboard/forms"
          className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {forms.length > 0 ? (
          <>
            {/* Table header */}
            <div className="hidden items-center gap-4 border-b border-border bg-muted/20 px-5 py-3 text-xs font-medium text-muted-foreground sm:flex">
              <div className="w-9" />

              <div className="flex-1">Form</div>

              <div className="w-24">Status</div>

              <div className="w-24">Responses</div>

              <div className="w-16" />
            </div>

            {forms.map((form) => (
              <FormRow key={form.id} {...form} />
            ))}
          </>
        ) : (
          <EmptyFormsState />
        )}
      </div>
    </section>
  );
}

function EmptyFormsState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/30">
        <Plus className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 text-sm font-medium">Create your first form</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Start collecting responses by creating a form.
      </p>

      <Link
        href="/dashboard/forms/new"
        className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Create form
      </Link>
    </div>
  );
}
