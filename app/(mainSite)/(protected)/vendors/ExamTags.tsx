"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ExamTags = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const examLevel = searchParams.get("examLevel") || "ASSOCIATE";

  // Array of exam levels
  const examLevels = [
    { label: "Associate Level", value: "ASSOCIATE" },
    { label: "Professional Level", value: "PROFESSIONAL" },
    { label: "Expert Level", value: "EXPERT" },
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
    <div className="flex w-full gap-2 rounded-md bg-[#E5E6FF]">
      {examLevels.map((level) => (
        <div
          key={level.value}
          onClick={() => handleTagClick(level.value)}
          className={cn(
            "flex-1 cursor-pointer rounded-lg p-4 text-center text-base",
            examLevel === level.value && "bg-base text-white",
          )}
        >
          {level.label}
        </div>
      ))}
    </div>
  );
};

export default ExamTags;
