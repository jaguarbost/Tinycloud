import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { AppTopbar } from "@/components/app-topbar";
import { ToolDetailTabs } from "@/components/tool-detail-tabs";
import { StatusBadge } from "@/components/status-badge";
import { RiskPill } from "@/components/risk-pill";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getToolBySlug, tools } from "@/lib/mock-data";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return { title: tool ? tool.name : "Tool" };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar title={tool.name} description={tool.category}>
        <Button variant="outline" size="sm" type="button">
          Edit
        </Button>
        <Button size="sm" type="button">
          Open tool
          <ExternalLink data-icon="inline-end" />
        </Button>
      </AppTopbar>
      <div className="flex flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4">
          <Link
            href="/app/tools"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to your tools
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {tool.name}
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {tool.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <StatusBadge status={tool.status} />
                <RiskPill risk={tool.risk} />
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs font-medium">
                  {tool.owner.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{tool.owner.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tool.owner.role}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ToolDetailTabs tool={tool} />
      </div>
    </div>
  );
}
