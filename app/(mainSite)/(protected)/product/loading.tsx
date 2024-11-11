import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="big-container block-space space-y-4 p-4">
      <div className="mx-auto mb-4 space-y-2 text-center">
        {/* Heading */}
        <Skeleton className="h-8 w-1/3" />

        {/* Subtitle */}
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* Cards Container */}
      <div className="flex space-x-4">
        {/* Card 1 */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        {/* Card 2 */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
