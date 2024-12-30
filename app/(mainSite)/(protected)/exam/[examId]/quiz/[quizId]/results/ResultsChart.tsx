"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ResultsChartProps {
  correct: number;
  incorrect: number;
  skipped: number;
}

const chartConfig = {
  answers: {
    label: "Answers",
  },
  correct: {
    label: "Correct",
    color: "hsl(var(--success))",
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--destructive))",
  },
  skipped: {
    label: "Skipped",
    color: "hsl(var(--warning))",
  },
} satisfies ChartConfig;

export default function ResultsChart({
  correct,
  incorrect,
  skipped,
}: ResultsChartProps) {
  const total = correct + incorrect + skipped;
  const correctPercentage = ((correct / total) * 100).toFixed(1);
  const trend = correct > incorrect ? "up" : "down";

  const chartData = [
    { category: "correct", answers: correct, fill: "var(--color-correct)" },
    {
      category: "incorrect",
      answers: incorrect,
      fill: "var(--color-incorrect)",
    },
    { category: "skipped", answers: skipped, fill: "var(--color-skipped)" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Exam Results Breakdown</CardTitle>
        <CardDescription>
          Correct, Incorrect, and Skipped Answers
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="answers" hideLabel />}
            />
            <Pie data={chartData} dataKey="answers">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trend === "up" ? (
            <>
              Trending up with {correctPercentage}% correct answers{" "}
              <TrendingUp className="text-success h-4 w-4" />
            </>
          ) : (
            <>
              Trending down with {correctPercentage}% correct answers{" "}
              <TrendingDown className="h-4 w-4 text-destructive" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Total questions: {total} | Correct: {correct} | Incorrect: {incorrect}{" "}
          | Skipped: {skipped}
        </div>
      </CardFooter>
    </Card>
  );
}
