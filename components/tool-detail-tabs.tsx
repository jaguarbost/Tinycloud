"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  MoonStar,
  Archive,
  PlayCircle,
  Circle,
  Database,
  Plug,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import type { Tool, ToolStatus } from "@/lib/mock-data";
import { connectors as allConnectors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ACCESS_LIST = [
  { name: "RevOps team", role: "Editor", type: "team" },
  { name: "Finance team", role: "Viewer", type: "team" },
  { name: "Everyone at Northwind Labs", role: "Can request access", type: "org" },
];

export function ToolDetailTabs({ tool }: { tool: Tool }) {
  const [status, setStatus] = useState<ToolStatus>(tool.status);
  const [visibility, setVisibility] = useState("team");
  const [copied, setCopied] = useState(false);

  const connectorDetails = allConnectors.filter((c) =>
    tool.connectors.includes(c.id),
  );

  const maxTrend = Math.max(...tool.trend, 1);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Tabs defaultValue="preview" className="gap-6">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="access">Access &amp; sharing</TabsTrigger>
        <TabsTrigger value="data">Connectors &amp; data</TabsTrigger>
        <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
            </div>
            <span className="ml-2 truncate text-xs text-muted-foreground">
              tools.northwindlabs.tinycloud.app/{tool.slug}
            </span>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold tracking-tight">
                {tool.name}
              </h3>
              <Badge variant="secondary">{tool.category}</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-lg border border-border p-3"
                >
                  <div className="h-2 w-3/4 rounded-full bg-muted" />
                  <div className="h-2 w-1/2 rounded-full bg-muted" />
                  <div className="mt-1 h-8 rounded-md bg-accent" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
              <div className="h-2 w-1/3 rounded-full bg-muted" />
              <div className="mt-2 flex items-end gap-1.5">
                {tool.trend.map((v, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm bg-primary/70"
                    style={{ height: `${Math.max((v / maxTrend) * 64, 4)}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Usage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Weekly active users</span>
              <span className="font-medium tabular-nums">{tool.weeklyUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total runs</span>
              <span className="font-medium tabular-nums">{tool.totalRuns}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last used</span>
              <span className="font-medium">{tool.lastUsedAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{tool.createdAt}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarFallback className="text-[10px] font-medium">
                  {tool.owner.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{tool.owner.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tool.owner.role}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="access" className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Who has access</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {ACCESS_LIST.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
              >
                <span className="text-sm font-medium">{entry.name}</span>
                <Badge variant="secondary">{entry.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Sharing</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Visibility
              </span>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="private">Only me</SelectItem>
                    <SelectItem value="team">My team</SelectItem>
                    <SelectItem value="org">Everyone at Northwind Labs</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Shareable link
              </span>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`northwindlabs.tinycloud.app/${tool.slug}`}
                  className="text-xs"
                />
                <Button size="icon" variant="outline" onClick={handleCopy} type="button">
                  {copied ? <Check /> : <Copy />}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="data" className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connected connectors</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {connectorDetails.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                This tool doesn&apos;t use any connectors.
              </p>
            ) : (
              connectorDetails.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Plug className="size-4" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {c.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Data &amp; retention</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Database className="size-4" />
                Data sensitivity
              </span>
              <Badge
                variant={tool.dataSensitivity === "confidential" ? "destructive" : "secondary"}
                className="capitalize"
              >
                {tool.dataSensitivity}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Retention period</span>
              <span className="font-medium">90 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Export on decommission</span>
              <span className="font-medium">CSV to owner</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="lifecycle" className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Current status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "active", label: "Active", icon: PlayCircle },
                  { value: "sleeping", label: "Sleeping", icon: MoonStar },
                  { value: "archived", label: "Archived", icon: Archive },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    status === option.value
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <option.icon className="size-4" />
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Circle className="size-2 fill-current" />
              Currently marked as <StatusBadge status={status} />
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Auto-sleep policy</span>
              <p className="text-sm text-muted-foreground">
                Tools with no activity for 30 days are automatically marked
                sleeping. After 90 days sleeping, they&apos;re proposed for
                archival with the owner notified.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-sm text-destructive">
              Danger zone
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Decommissioning removes the tool, revokes connector access, and
              exports data to the owner. This can&apos;t be undone.
            </p>
            <Button variant="destructive" className="w-full" type="button">
              Decommission tool
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
