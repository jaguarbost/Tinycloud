"use client";

import { useState } from "react";
import { Check, X, Plug } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RiskPill } from "@/components/risk-pill";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { connectors, type ApprovalRequest } from "@/lib/mock-data";

export function ApprovalsQueue({
  requests,
}: {
  requests: ApprovalRequest[];
}) {
  const [decisions, setDecisions] = useState<
    Record<string, "approved" | "rejected">
  >({});

  const pending = requests.filter((r) => !decisions[r.id]);

  return (
    <div className="flex flex-col gap-4">
      {pending.length === 0 ? (
        <Empty className="rounded-lg border border-border py-16">
          <EmptyMedia variant="icon">
            <Check />
          </EmptyMedia>
          <EmptyTitle>You&apos;re all caught up</EmptyTitle>
          <EmptyDescription>
            New access and connector requests will show up here.
          </EmptyDescription>
        </Empty>
      ) : (
        pending.map((request) => {
          const requestConnectors = connectors.filter((c) =>
            request.connectorsRequested.includes(c.id),
          );
          return (
            <Card key={request.id}>
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
                <div className="flex items-start gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs font-medium">
                      {request.requester.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold">
                      {request.toolName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested by {request.requester.name} ·{" "}
                      {request.submittedAt}
                    </p>
                  </div>
                </div>
                <RiskPill risk={request.risk} />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  {request.reason}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {request.dataSensitivity} data
                  </Badge>
                  <Badge variant="secondary">
                    ~{request.estimatedUsers} users
                  </Badge>
                  {requestConnectors.map((c) => (
                    <Badge
                      key={c.id}
                      variant="outline"
                      className="gap-1 font-normal"
                    >
                      <Plug className="size-3" />
                      {c.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() =>
                      setDecisions((d) => ({ ...d, [request.id]: "approved" }))
                    }
                  >
                    <Check data-icon="inline-start" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() =>
                      setDecisions((d) => ({ ...d, [request.id]: "rejected" }))
                    }
                  >
                    <X data-icon="inline-start" />
                    Request changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
