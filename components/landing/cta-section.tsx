import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
          Stop letting spreadsheets run the business.
        </h2>
        <p className="max-w-xl text-base text-muted-foreground">
          Set up your workspace in minutes and give every team a governed way
          to build the small tools they actually need.
        </p>
        <Button size="lg" asChild>
          <Link href="/app">
            Start building free
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
