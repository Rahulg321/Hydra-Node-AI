"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ExamTags = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const examLevel = searchParams.get("examLevel") || "ASSOCIATE";

  // Array of exam levels
  const examLevels = [
    { label: "Associate", value: "ASSOCIATE" },
    { label: "Professional", value: "PROFESSIONAL" },
    { label: "Expert", value: "EXPERT" },
    { label: "Free", value: "FREE" },
  ];

  const handleTagClick = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("examLevel", term);
    } else {
      params.delete("examLevel");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 flex items-center gap-1 text-white">
        Level <ArrowRight className="h-4 w-4 text-yellow-600" />
      </span>
      <div className="flex items-center rounded-full bg-muted p-2 shadow-[0px_-3px_4px_0px_#323232_inset]">
        {examLevels.map((level) => (
          <div
            key={level.value}
            onClick={() => handleTagClick(level.value)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1 text-white",
              examLevel === level.value ? "bg-[#FF8845]" : "",
            )}
          >
            <span className="text-sm">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamTags;
