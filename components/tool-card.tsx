import Link from "next/link";
import { Users, Clock } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { RiskPill } from "@/components/risk-pill";
import type { Tool } from "@/lib/mock-data";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/app/tools/${tool.slug}`} className="group block">
      <Card className="h-full gap-3 transition-all group-hover:border-primary/40 group-hover:shadow-md">
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              {tool.category}
            </span>
            <StatusBadge status={tool.status} />
          </div>
          <h3 className="text-sm font-semibold leading-snug tracking-tight text-foreground">
            {tool.name}
          </h3>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {tool.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px] font-medium">
                  {tool.owner.initials}
                </AvatarFallback>
              </Avatar>
              <RiskPill risk={tool.risk} />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="size-3.5" />
                {tool.weeklyUsers}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {tool.lastUsedAt}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
