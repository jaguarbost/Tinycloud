import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { lifecycleItems, recentActivity } from "@/lib/mock-data";
import {
  ArchiveIcon,
  ClockIcon,
  RefreshCwIcon,
  TrashIcon,
} from "lucide-react";

const ACTION_CONFIG: Record<
  string,
  { label: string; icon: typeof RefreshCwIcon; variant: "outline" | "ghost" }
> = {
  keep: { label: "Keep active", icon: RefreshCwIcon, variant: "outline" },
  sleep: { label: "Confirm sleep", icon: ClockIcon, variant: "outline" },
  archive: { label: "Archive", icon: ArchiveIcon, variant: "outline" },
  decommission: { label: "Decommission", icon: TrashIcon, variant: "ghost" },
};

const actionable = lifecycleItems.filter((i) => i.suggestedAction !== "keep");
const healthy = lifecycleItems.filter((i) => i.suggestedAction === "keep");

export default function LifecyclePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Lifecycle
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Every tool is watched for use. Governance flags what has gone
          quiet, suggests an action, and lets owners decide — nothing
          disappears silently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ClockIcon className="size-4 text-muted-foreground" />
              Needs a decision
            </CardTitle>
            <CardDescription>
              Flagged by usage — owners were notified automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Inactive</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Suggested action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionable.map((item) => {
                  const action = ACTION_CONFIG[item.suggestedAction];
                  return (
                    <TableRow key={item.toolSlug}>
                      <TableCell className="font-medium text-foreground">
                        {item.toolName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.owner.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.daysInactive >= 90
                              ? "border-destructive/30 text-destructive"
                              : "text-muted-foreground"
                          }
                        >
                          {item.daysInactive} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={action.variant} size="sm">
                          <action.icon data-icon="inline-start" />
                          {action.label}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RefreshCwIcon className="size-4 text-muted-foreground" />
              Healthy &amp; active
            </CardTitle>
            <CardDescription>
              Used weekly, no action needed right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {healthy.map((item) => (
              <div
                key={item.toolSlug}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">
                    {item.toolName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.weeklyUsers} weekly users
                  </span>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>
            A live feed of what changed across the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-5">
            {recentActivity.map((event, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center pt-0.5">
                  <span className="size-2 rounded-full bg-primary" />
                  {i < recentActivity.length - 1 && (
                    <span className="w-px flex-1 bg-border mt-1.5" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-0.5 pb-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{event.actor}</span>{" "}
                    <span className="text-muted-foreground">{event.action}</span>{" "}
                    <span className="font-medium">{event.target}</span>
                  </p>
                  <span className="text-xs text-muted-foreground/70">
                    {event.time}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
