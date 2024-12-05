"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

const COLORS = {
  light: ["#4ade80", "#f87171", "#fbbf24"],
  dark: ["#22c55e", "#ef4444", "#f59e0b"],
};

export function ResultsChart({
  correct,
  incorrect,
  skipped,
}: {
  correct: number;
  incorrect: number;
  skipped: number;
}) {
  const { theme } = useTheme();
  const currentColors = theme === "dark" ? COLORS.dark : COLORS.light;

  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: incorrect },
    { name: "Skipped", value: skipped },
  ];

  const total = correct + incorrect + skipped;

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Exam Results Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={currentColors[index % currentColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${value} (${((value / total) * 100).toFixed(1)}%)`,
                  "Count",
                ]}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  color: theme === "dark" ? "#fffff" : "#1f2937",
                }}
              />
              <Legend
                formatter={(value, entry, index) => (
                  <span
                    style={{ color: theme === "dark" ? "#f3f4f6" : "#1f2937" }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
