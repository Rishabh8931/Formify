import Link from "next/link";
import { ArrowRight, FileText, Inbox } from "lucide-react";

type ResponseActivityItem = {
  id: string;
  formId: string;
  formTitle: string;
  respondent: string;
  submittedAt: string;
};

type ResponseActivityProps = {
  responses?: ResponseActivityItem[];
};

export function ResponseActivity({ responses = [] }: ResponseActivityProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold">Recent responses</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The latest responses submitted to your forms.
          </p>
        </div>

        <Link
          href="/dashboard/responses"
          className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {responses.length > 0 ? (
          <div className="divide-y divide-border">
            {responses.map((response) => (
              <ResponseRow key={response.id} response={response} />
            ))}
          </div>
        ) : (
          <EmptyResponsesState />
        )}
      </div>
    </section>
  );
}

function ResponseRow({ response }: { response: ResponseActivityItem }) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 md:px-5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30">
        <FileText className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={`/dashboard/forms/${response.formId}`}
          className="block truncate text-sm font-medium hover:underline"
        >
          {response.formTitle}
        </Link>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {response.respondent}
        </p>
      </div>

      <p className="shrink-0 text-xs text-muted-foreground">
        {response.submittedAt}
      </p>
    </div>
  );
}

function EmptyResponsesState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/30">
        <Inbox className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 text-sm font-medium">No responses yet</h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Responses will appear here once someone submits one of your forms.
      </p>
    </div>
  );
}
