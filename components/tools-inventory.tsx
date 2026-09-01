"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { RiskPill } from "@/components/risk-pill";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import type { Tool, ToolStatus } from "@/lib/mock-data";

export function ToolsInventory({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ToolStatus | "all">("all");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesQuery =
        query.trim().length === 0 ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.owner.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.department.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || tool.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [tools, query, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, owners, teams..."
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as ToolStatus | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sleeping">Sleeping</SelectItem>
              <SelectItem value="in-review">In review</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tool</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead className="text-right">Weekly users</TableHead>
              <TableHead>Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((tool) => (
              <TableRow key={tool.id} className="group">
                <TableCell>
                  <Link
                    href={`/app/tools/${tool.slug}`}
                    className="flex flex-col gap-0.5"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {tool.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tool.category}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px] font-medium">
                        {tool.owner.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {tool.owner.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={tool.status} />
                </TableCell>
                <TableCell>
                  <RiskPill risk={tool.risk} />
                </TableCell>
                <TableCell className="text-right tabular-nums text-sm">
                  {tool.weeklyUsers}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {tool.lastUsedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 ? (
          <Empty className="border-t border-border py-12">
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No tools found</EmptyTitle>
            <EmptyDescription>
              Try a different search term or clear the status filter.
            </EmptyDescription>
          </Empty>
        ) : null}
      </div>
    </div>
  );
}
