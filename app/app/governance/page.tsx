import { ShieldCheck, Users, Clock3, TriangleAlert } from "lucide-react";

import { AppTopbar } from "@/components/app-topbar";
import {
  DepartmentUsageChart,
  MonthlyTrendChart,
} from "@/components/governance-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { governanceMetrics } from "@/lib/mock-data";

export const metadata = { title: "Governance" };

export default function GovernancePage() {
  const m = governanceMetrics;
  const riskTotal = m.riskBreakdown.low + m.riskBreakdown.medium + m.riskBreakdown.high;

  const stats = [
    {
      label: "Tools with an owner",
      value: `${m.ownedByHuman}/${m.totalTools}`,
      icon: Users,
    },
    {
      label: "Policy compliant",
      value: `${Math.round((m.policyCompliant / m.totalTools) * 100)}%`,
      icon: ShieldCheck,
    },
    {
      label: "Avg. approval time",
      value: `${m.avgApprovalHours}h`,
      icon: Clock3,
    },
    {
      label: "Orphaned tools",
      value: m.orphaned,
      icon: TriangleAlert,
    },
  ];

  const riskRows: { label: string; count: number; className: string }[] = [
    { label: "Low", count: m.riskBreakdown.low, className: "bg-success" },
    { label: "Medium", count: m.riskBreakdown.medium, className: "bg-warning" },
    { label: "High", count: m.riskBreakdown.high, className: "bg-destructive" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <AppTopbar
        title="Governance"
        description="Org-wide ownership, policy, and risk posture."
      />
      <div className="flex flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="gap-2 py-4">
              <CardHeader className="flex flex-row items-center justify-between px-4 space-y-0">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4">
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {stat.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Usage by department</CardTitle>
            </CardHeader>
            <CardContent>
              <DepartmentUsageChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Risk breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {riskRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium tabular-nums">
                      {row.count}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${row.className}`}
                      style={{ width: `${(row.count / riskTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Tools created vs. decommissioned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
