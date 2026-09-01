import {
  LayoutGrid,
  Plug,
  MoonStar,
  Users,
  Gauge,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "A real inventory of every tool",
    description:
      "One searchable list of every internal tool your company runs, who owns it, and how it's used — no more guessing what's live.",
  },
  {
    icon: Plug,
    title: "Connectors, not credentials",
    description:
      "Tools request access to Sheets, Slack, Salesforce, or your warehouse through vetted connectors — never a shared password.",
  },
  {
    icon: MoonStar,
    title: "Automatic lifecycle management",
    description:
      "Unused tools fall asleep after 30 days and are proposed for archival after 90 — with the owner in the loop the entire time.",
  },
  {
    icon: Users,
    title: "Scoped access by default",
    description:
      "Every tool ships private to its owner's team. Widening access to the org is a deliberate, logged decision.",
  },
  {
    icon: Gauge,
    title: "Governance you can actually see",
    description:
      "A live dashboard of ownership coverage, risk distribution, and approval times — the audit trail writes itself.",
  },
  {
    icon: Lock,
    title: "Approvals before anything ships",
    description:
      "Anything touching sensitive data or a new connector routes to a reviewer automatically, with full context attached.",
  },
];

export function FeaturesSection() {
  return (
    <section id="product" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-sm font-medium text-primary">Product</span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Everything shadow IT was missing
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            TinyCloud isn&apos;t just a tool builder. It&apos;s the layer of
            ownership and governance that internal tools never had.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-accent/40"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
