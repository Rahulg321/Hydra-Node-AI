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
  const words = title.split(" ");
  const truncatedTitle =
    words.length > 2
      ? `${words.slice(0, 2).join(" ")} ${words.slice(2).join(" ")}`
      : title;
  const titleParts = truncatedTitle.split(" ");

  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-3xl border bg-[#0C0C0C] p-5",
        className,
      )}
    >
      <div className="mb-4 flex justify-start">
        {icon || (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-white">
            {iconLetter}
          </div>
        )}
      </div>

      <h4 className="transducer-font mb-4 tracking-wider">
        {titleParts.length > 2 ? (
          <>
            {titleParts.slice(0, 2).join(" ")}
            <br />
            {titleParts.slice(2).join(" ")}
          </>
        ) : (
          title
        )}
      </h4>
      <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-2 md:gap-x-4 md:gap-y-4">
        <div className="text-sm text-white/30">
          Status: <span className="">{status}</span>
        </div>
        <div className="text-sm text-white/30">
          Marks: <span className="">{marks}</span>
        </div>
        <div className="text-sm text-white/30">
          Date: <span className="">{date}</span>
        </div>
        <div className="text-sm text-white/30">
          Mode: <span className="">{mode}</span>
        </div>
      </div>

      <Link
        href={link}
        className="mt-1 flex items-center gap-1 text-sm text-orange-400 transition-colors hover:text-orange-300"
      >
        View details <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
