"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ResultsChart({
  correct,
  incorrect,
  skipped,
}: {
  correct: number;
  incorrect: number;
  skipped: number;
}) {
  const chartData = [
    { browser: "correct", score: correct, fill: "var(--color-correct)" },
    { browser: "incorrect", score: incorrect, fill: "var(--color-incorrect)" },
    { browser: "skipped", score: skipped, fill: "var(--color-skipped)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Results",
    },
    correct: {
      label: "Correct",
      color: "hsl(var(--chart-1))",
    },
    incorrect: {
      label: "Incorrect",
      color: "hsl(var(--chart-2))",
    },
    skipped: {
      label: "Skipped",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Exam Results</CardTitle>
        <CardDescription>Total Score</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie data={chartData} dataKey="score" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total score of your exam
        </div>
      </CardFooter>
    </Card>
  );
}
