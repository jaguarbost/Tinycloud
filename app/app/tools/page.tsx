import { AppTopbar } from "@/components/app-topbar";
import { ToolsInventory } from "@/components/tools-inventory";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { tools } from "@/lib/mock-data";

export const metadata = { title: "Your tools" };

export default function ToolsPage() {
  const active = tools.filter((t) => t.status === "active").length;
  const sleeping = tools.filter((t) => t.status === "sleeping").length;
  const highRisk = tools.filter((t) => t.risk === "high").length;

  const stats = [
    { label: "Total tools", value: tools.length },
    { label: "Active", value: active },
    { label: "Sleeping", value: sleeping },
    { label: "High risk", value: highRisk },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar
        title="Your tools"
        description="Every TinyTool your team has built, with owner and status."
      />
      <div className="flex flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="gap-1 py-4">
              <CardHeader className="px-4">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </CardHeader>
              <CardContent className="px-4">
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {stat.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <ToolsInventory tools={tools} />
      </div>
    </div>
  );
}
