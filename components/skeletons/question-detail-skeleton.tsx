import React from "react";
import { Skeleton } from "../ui/skeleton";

const QuestionDetailSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      {/* Skeleton for Question Title */}
      <Skeleton className="mb-2 h-8 w-3/4 rounded-md" />

      {/* Skeleton for Question Description */}
      <Skeleton className="mb-4 h-4 w-full rounded-md" />
      <Skeleton className="mb-4 h-4 w-5/6 rounded-md" />
      <Skeleton className="mb-4 h-4 w-2/3 rounded-md" />

      {/* Skeleton for Options or Fields */}
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Skeleton className="h-5 w-5 rounded-full" /> {/* Option Icon */}
          <Skeleton className="h-4 w-3/4 rounded-md" /> {/* Option Text */}
        </div>
      ))}

      {/* Skeleton for Action Button */}
      <div className="mt-6">
        <Skeleton className="h-10 w-1/2 rounded-md" />
      </div>
    </div>
  );
};

export default QuestionDetailSkeleton;
