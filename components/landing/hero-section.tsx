import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { RiskPill } from "@/components/risk-pill";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col gap-6">
          <Badge
            variant="outline"
            className="w-fit gap-1.5 border-primary/25 bg-accent px-3 py-1 text-accent-foreground"
          >
            <Sparkles className="size-3.5" />
            Now with automatic lifecycle policies
          </Badge>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Turn a request into a real tool, without the shadow IT.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            TinyCloud lets anyone describe a small internal tool in plain
            language and get a working, owned, governed app in minutes —
            complete with access policy, connector approvals, and an expiry
            date from day one.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/app">
                Start building free
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["PN", "DA", "SW", "JK"].map((initials) => (
                <Avatar key={initials} className="size-7 border-2 border-background">
                  <AvatarFallback className="text-[10px] font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>Trusted by ops, finance, and platform teams at 200+ companies</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
              </div>
              <span className="ml-2 text-xs text-muted-foreground">
                northwindlabs.tinycloud.app
              </span>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Describe what you need
                </p>
                <p className="mt-2 text-sm text-foreground">
                  &ldquo;A tool that lets managers approve or deny expense
                  reports over $500 with one click&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">
                    Expense Approval Tracker
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Generated · Owner assigned · Policy applied
                  </span>
                </div>
                <StatusBadge status="in-review" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
                  <span className="text-xs text-muted-foreground">Risk level</span>
                  <RiskPill risk="high" />
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
                  <span className="text-xs text-muted-foreground">Expires in</span>
                  <span className="text-sm font-medium text-foreground">90 days</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-success/15">
                <Sparkles className="size-4 text-success-foreground" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-medium text-foreground">
                  Built in 42 seconds
                </span>
                <span className="text-[11px] text-muted-foreground">
                  from prompt to preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
