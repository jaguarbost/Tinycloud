import { ShieldCheck, Users, Clock3, TriangleAlert } from "lucide-react";

const STATS = [
  { label: "Tools with an owner", value: "41/42", icon: Users },
  { label: "Policy compliant", value: "93%", icon: ShieldCheck },
  { label: "Avg. approval time", value: "6.4h", icon: Clock3 },
  { label: "Orphaned tools", value: "1", icon: TriangleAlert },
];

export function GovernanceSection() {
  return (
    <section id="governance" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium text-primary">Governance</span>
          <h2 className="max-w-md text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            IT gets the visibility they&apos;ve always wanted.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Every tool created in TinyCloud reports into one governance
            dashboard — ownership, risk, connector usage, and approval
            latency, updated in real time. No spreadsheet audits, no
            surprises.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-xl border border-border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                  <stat.icon className="size-4 text-muted-foreground" />
                </div>
                <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Risk breakdown</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-success" style={{ width: "57%" }} />
              <div className="h-full bg-warning" style={{ width: "31%" }} />
              <div className="h-full bg-destructive" style={{ width: "12%" }} />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-success" />
                Low
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-warning" />
                Medium
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-destructive" />
                High
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
