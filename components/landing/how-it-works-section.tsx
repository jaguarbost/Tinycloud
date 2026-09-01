import { MessageSquareText, ShieldCheck, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Describe the tool",
    description:
      "Tell TinyCloud who it's for, what it does, and what data it touches — in plain English, no ticket required.",
  },
  {
    icon: ShieldCheck,
    title: "Governance applies itself",
    description:
      "An owner, an access policy, a risk rating, and an expiry date are attached automatically, before anyone can share it.",
  },
  {
    icon: Rocket,
    title: "Ship it, then retire it",
    description:
      "Your team uses the tool immediately. When it goes quiet, TinyCloud flags it for renewal or lets it retire cleanly.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-sm font-medium text-primary">How it works</span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            From idea to governed tool in three steps
          </h2>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
