import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-6", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <circle cx="12.5" cy="19.5" r="3.5" className="fill-primary-foreground" />
      <circle cx="18" cy="14.5" r="5" className="fill-primary-foreground" />
      <circle cx="22.5" cy="19" r="3" className="fill-primary-foreground" />
      <rect x="10" y="19" width="15" height="4.5" rx="2.25" className="fill-primary-foreground" />
    </svg>
  );
}
