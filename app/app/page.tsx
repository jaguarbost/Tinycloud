import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppTopbar } from "@/components/app-topbar";
import { PromptComposer } from "@/components/prompt-composer";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser, recentActivity, tools } from "@/lib/mock-data";

export const metadata = { title: "Create" };

export default function CreatePage() {
  const recentTools = [...tools]
    .filter((t) => t.status === "active")
    .slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar
        title="Create"
        description="Describe a need, get a working internal tool."
      />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-primary">
              Good to see you, {currentUser.name.split(" ")[0]}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              What should we build today?
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Every tool you create ships with an owner, an access policy, and
              a lifecycle — no spreadsheets quietly running the business.
            </p>
          </div>
          <PromptComposer />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Pick up where you left off
              </h3>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/app/tools">
                  View all tools
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Workspace activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex flex-col gap-0.5 text-sm">
                    <p className="text-foreground">
                      <span className="font-medium">{item.actor}</span>{" "}
                      <span className="text-muted-foreground">
                        {item.action}
                      </span>{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
