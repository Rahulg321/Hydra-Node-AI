import React from "react";
import { ResultsChart } from "./ResultsChart";
import { Check, CircleOff, Timer, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuizResultsPage = () => {
  return (
    <div>
      <span>Results for your Exam</span>
      <h1 className="my-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        architecto{" "}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2>Exam Score</h2>
          <div className="my-4 flex items-center gap-2">
            <h1>85%</h1>
            <span className="font-semibold text-green-500">Passed</span>
          </div>
          <h3 className="mb-4 font-medium">January 12, 2023 at 10:00 AM</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              title="Correct"
              value="275"
              backgroundColor="bg-green-200"
              icon={<Check className="text-green-400" />}
            />
            <InfoCard
              title="Incorrect"
              value="275"
              backgroundColor="bg-pink-400"
              icon={<X className="text-pink-800" />}
            />
            <InfoCard
              title="Skipped/Unanswered"
              value="275"
              backgroundColor="bg-violet-400"
              icon={<CircleOff className="text-violet-800" />}
            />
            <InfoCard
              title="Time Taken"
              value="275"
              backgroundColor="bg-orange-400"
              icon={<Timer className="text-orange-800" />}
            />
          </div>
        </div>
        <ResultsChart />
      </div>
      <div className="mt-4 flex justify-between">
        <Button className="mb-4 rounded-full bg-green-600 px-10 py-6 text-base">
          Review Exam
        </Button>

        <div className="space-x-4">
          <Button className="mb-4 rounded-full bg-base px-10 py-6 text-base">
            Retake Exam
          </Button>

          <Button className="mb-4 rounded-full bg-base px-10 py-6 text-base">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;

function InfoCard({
  title,
  value,
  icon,
  backgroundColor,
}: {
  title: string;
  value: string;
  icon: any;
  backgroundColor: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("rounded-lg p-2", backgroundColor)}>{icon}</div>
      <div>
        <h5 className="font-semibold">{title}</h5>
        <span>{value}</span>
      </div>
    </div>
  );
}
