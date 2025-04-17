"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ExamHistoryCardProps {
  icon?: React.ReactNode;
  iconLetter?: string;
  title: string;
  status: string;
  marks: string;
  date: string;
  mode: string;
  link: string;
  className?: string;
}

export const ExamHistoryCard = ({
  icon,
  iconLetter = "G",
  title = "EXPERT MACHINE LEARNING ENGINEER",
  status = "Passed",
  marks = "80/100",
  date = "12th Mar, 25",
  mode = "Practice",
  link = "/",
  className,
}: ExamHistoryCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-shrink-0 flex-col rounded-3xl border bg-[#0C0C0C] p-5 shadow-md transition-transform hover:scale-[1.02]",
        className,
      )}
    >
      <div className="mb-4 flex justify-start">
        {icon || (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-white shadow-sm">
            {iconLetter}
          </div>
        )}
      </div>

      <h4 className="transducer-font mb-4 line-clamp-2 text-wrap break-words font-semibold">
        {title}
      </h4>

      <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2">
        <div className="text-sm text-white/50">
          Status: <span className="font-medium text-white">{status}</span>
        </div>
        <div className="text-sm text-white/50">
          Marks: <span className="font-medium text-white">{marks}</span>
        </div>
        <div className="text-sm text-white/50">
          Date: <span className="font-medium text-white">{date}</span>
        </div>
        <div className="text-sm text-white/50">
          Mode: <span className="font-medium text-white">{mode}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link
          href={link}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#FF9266] transition-colors"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
