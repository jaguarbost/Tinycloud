import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/mock-data";

const RISK_CONFIG: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low risk", className: "border-success/30 text-success-foreground" },
  medium: {
    label: "Medium risk",
    className: "border-warning/40 text-warning-foreground",
  },
  high: {
    label: "High risk",
    className: "border-destructive/30 text-destructive",
  },
};

export function RiskPill({
  risk,
  className,
}: {
  risk: RiskLevel;
  className?: string;
}) {
  const config = RISK_CONFIG[risk];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
