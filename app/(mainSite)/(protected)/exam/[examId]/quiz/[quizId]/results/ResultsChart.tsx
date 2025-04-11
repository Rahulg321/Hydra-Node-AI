"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";
import Image from "next/image";
interface ResultsChartProps {
  correct: number;
  incorrect: number;
  skipped: number;
}

export default function ResultsChart({
  correct,
  incorrect,
  skipped,
}: ResultsChartProps) {
  const chartData = [
    { category: "correct", count: correct, fill: "hsl(142, 76%, 36%)" }, // green
    { category: "incorrect", count: incorrect, fill: "hsl(0, 84%, 60%)" }, // red
    { category: "skipped", count: skipped, fill: "hsl(45, 93%, 47%)" }, // yellow
  ];

  const chartConfig = {
    count: {
      label: "Questions",
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

  const totalQuestions = React.useMemo(() => {
    return correct + incorrect + skipped;
  }, [correct, incorrect, skipped]);

  return (
    <div className="">
      <div className="relative">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] md:max-h-[300px] lg:max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Image
            src={HydranodeWhiteLogo}
            alt="hydranode logo"
            className="block object-cover"
          />
        </div>
      </div>
    </div>
  );
}
