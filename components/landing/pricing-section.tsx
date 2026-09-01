import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Team",
    price: "$0",
    cadence: "up to 10 tools",
    description: "For a single team getting off spreadsheets.",
    features: [
      "Unlimited creators",
      "10 active tools",
      "Standard connectors",
      "Basic lifecycle policies",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$39",
    cadence: "per editor / month",
    description: "For companies running governance at scale.",
    features: [
      "Unlimited tools",
      "All connectors, incl. warehouse",
      "Approval workflows",
      "Governance dashboard & exports",
      "Custom retention policies",
    ],
    cta: "Start building",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual contract",
    description: "For regulated orgs with strict data residency needs.",
    features: [
      "SSO & SCIM provisioning",
      "Dedicated connector review",
      "Audit log retention (7 yrs)",
      "Named governance advisor",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-sm font-medium text-primary">Pricing</span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Simple pricing, governed from day one
          </h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col gap-6",
                plan.highlighted && "border-primary shadow-lg",
              )}
            >
              <CardHeader className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {plan.name}
                  </span>
                  {plan.highlighted ? (
                    <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/app">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
