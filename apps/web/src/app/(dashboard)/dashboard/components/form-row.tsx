import Link from "next/link";
import { ExternalLink, MoreHorizontal, FileText } from "lucide-react";

type FormRowProps = {
  id: string;
  title: string;
  status: "draft" | "published";
  responseCount: number;
  updatedAt: string;
};

export function FormRow({
  id,
  title,
  status,
  responseCount,
  updatedAt,
}: FormRowProps) {
  return (
    <div className="group flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0 md:px-5">
      {/* Form icon */}
      <div className="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 sm:flex">
        <FileText className="size-4 text-muted-foreground" />
      </div>

      {/* Form info */}
      <div className="min-w-0 flex-1">
        <Link
          href={`/dashboard/forms/${id}`}
          className="block truncate text-sm font-medium hover:underline"
        >
          {title}
        </Link>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Updated {updatedAt}
        </p>
      </div>

      {/* Status */}
      <div className="hidden w-24 sm:block">
        <StatusBadge status={status} />
      </div>

      {/* Responses */}
      <div className="hidden w-24 text-sm text-muted-foreground md:block">
        {responseCount}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {status === "published" && (
          <Link
            href={`/dashboard/forms/${id}`}
            aria-label={`Open ${title}`}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-colors hover:bg-muted hover:text-foreground group-hover:opacity-100"
          >
            <ExternalLink className="size-4" />
          </Link>
        )}

        <button
          type="button"
          aria-label={`More actions for ${title}`}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "draft" | "published" }) {
  const isPublished = status === "published";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        isPublished
          ? "bg-foreground/5 text-foreground"
          : "bg-muted text-muted-foreground",
      ].join(" ")}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}
