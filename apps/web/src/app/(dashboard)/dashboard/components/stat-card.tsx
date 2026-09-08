import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>

        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/40">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>

      {description && (
        <p className="mt-3 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
