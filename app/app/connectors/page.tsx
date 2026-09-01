import { AppTopbar } from "@/components/app-topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { connectors } from "@/lib/mock-data";
import { CheckCircle2Icon, ClockIcon, PlugIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  connected: {
    label: "Connected",
    icon: CheckCircle2Icon,
    badge: "bg-success/10 text-success-foreground",
  },
  pending: {
    label: "Pending review",
    icon: ClockIcon,
    badge: "bg-warning/15 text-warning-foreground",
  },
  available: {
    label: "Available",
    icon: PlugIcon,
    badge: "bg-muted text-muted-foreground",
  },
} as const;

export const metadata = { title: "Connectors" };

export default function ConnectorsPage() {
  const connected = connectors.filter((c) => c.status === "connected");
  const other = connectors.filter((c) => c.status !== "connected");

  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar
        title="Connectors"
        description="The data sources and destinations tools are allowed to touch."
      />
      <div className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Connected ({connected.length})
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connected.map((c) => (
              <ConnectorCard key={c.id} connector={c} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">
            Available &amp; pending
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((c) => (
              <ConnectorCard key={c.id} connector={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ConnectorCard({
  connector,
}: {
  connector: (typeof connectors)[number];
}) {
  const config = STATUS_CONFIG[connector.status];
  return (
    <Card className="gap-3">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <PlugIcon className="size-4" />
          </span>
          <Badge
            variant="outline"
            className={cn("gap-1 border-transparent", config.badge)}
          >
            <config.icon className="size-3" />
            {config.label}
          </Badge>
        </div>
        <CardTitle className="text-sm">{connector.name}</CardTitle>
        <CardDescription>{connector.category}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {connector.description}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        {connector.status === "connected" ? (
          <>
            <span>{connector.toolsUsing} tools using this</span>
            <span>Synced {connector.lastSynced}</span>
          </>
        ) : connector.status === "pending" ? (
          <span className="truncate">{connector.owner}</span>
        ) : (
          <Button variant="outline" size="sm" className="ml-auto" type="button">
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
