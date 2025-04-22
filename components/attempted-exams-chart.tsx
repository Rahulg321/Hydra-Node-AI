"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AttemptedExamsChart({
  barChartData,
  totalAttemptedExams,
}: {
  barChartData: { date: string; count: number }[];
  totalAttemptedExams: number;
}) {
  return (
    <Card className="bg-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={barChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={70}
              fontSize={11}
              interval={0}
              dy={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-center leading-none text-muted-foreground">
          Showing total exams attempted for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
