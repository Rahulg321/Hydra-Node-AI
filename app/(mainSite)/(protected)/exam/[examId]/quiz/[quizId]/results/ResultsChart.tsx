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
import HydranodeGradientLogo from "@/public/logos/hydranode-gradient-logo.png";
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
    { category: "correct", count: correct, fill: "hsla(136, 59%, 27%, 1)" }, // green
    { category: "incorrect", count: incorrect, fill: "hsla(0, 96%, 19%, 1)" }, // red
    { category: "skipped", count: skipped, fill: "hsla(43, 100%, 45%, 1)" }, // yellow
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
          className="mx-auto aspect-square max-h-[250px] md:max-h-[325px] lg:max-h-[400px]"
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
              innerRadius={105}
              strokeWidth={10}
            />
          </PieChart>
        </ChartContainer>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Image
            src={HydranodeGradientLogo}
            alt="hydranode logo"
            className="block object-cover"
            width={75}
            height={75}
          />
        </div>
      </div>
    </div>
  );
}
