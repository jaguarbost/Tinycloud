"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { governanceMetrics } from "@/lib/mock-data";

const usageConfig: ChartConfig = {
  users: { label: "Weekly users", color: "var(--chart-1)" },
};

const trendConfig: ChartConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  decommissioned: { label: "Decommissioned", color: "var(--chart-4)" },
};

export function DepartmentUsageChart() {
  return (
    <ChartContainer config={usageConfig} className="aspect-auto h-64 w-full">
      <BarChart data={governanceMetrics.departmentUsage}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="department"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="users" fill="var(--color-users)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function MonthlyTrendChart() {
  return (
    <ChartContainer config={trendConfig} className="aspect-auto h-64 w-full">
      <LineChart data={governanceMetrics.monthlyTrend}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="created"
          stroke="var(--color-created)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="decommissioned"
          stroke="var(--color-decommissioned)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
