"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

interface QuestionsHeaderProps {
  examName: string;
  questionCount: number;
  backLink?: string;
  onManageExam?: () => void;
  className?: string;
}

export function QuestionsHeader({
  examName,
  questionCount,
  backLink = "/",
  onManageExam,
  className,
}: QuestionsHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex flex-col items-center justify-between border-b bg-background px-4 py-2 transition-all duration-200 ease-in-out dark:bg-gray-950 sm:flex-row",
        isSticky && "shadow-md",
        className,
      )}
    >
      <div className="mb-2 flex w-full items-center justify-start sm:mb-0 sm:w-1/3">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Go back</span>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center sm:w-1/3">
        <h1 className="max-w-[200px] truncate text-lg font-semibold text-foreground sm:max-w-none">
          {examName}
        </h1>
      </div>
      <div className="mt-2 flex w-full items-center justify-end space-x-2 sm:mt-0 sm:w-1/3">
        <span className="text-sm text-muted-foreground">
          {questionCount} question{questionCount !== 1 ? "s" : ""}
        </span>
        {onManageExam && (
          <Button
            variant="outline"
            size="sm"
            onClick={onManageExam}
            className="bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Manage Exam
          </Button>
        )}
      </div>
    </header>
  );
}