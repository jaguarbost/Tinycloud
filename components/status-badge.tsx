import { cn } from "@/lib/utils";
import type { ToolStatus } from "@/lib/mock-data";

const STATUS_CONFIG: Record<
  ToolStatus,
  { label: string; dot: string; className: string }
> = {
  active: {
    label: "Active",
    dot: "bg-success",
    className: "bg-success/10 text-success-foreground",
  },
  sleeping: {
    label: "Sleeping",
    dot: "bg-warning",
    className: "bg-warning/15 text-warning-foreground",
  },
  archived: {
    label: "Archived",
    dot: "bg-muted-foreground",
    className: "bg-muted text-muted-foreground",
  },
  "in-review": {
    label: "In review",
    dot: "bg-primary",
    className: "bg-accent text-accent-foreground",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ToolStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
