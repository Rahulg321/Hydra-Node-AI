import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="block-space big-container p-4">
      {/* Heading */}
      <Skeleton className="mb-2 h-8 w-1/3" />

      {/* Subtitle */}
      <Skeleton className="mb-4 h-20 w-full" />

      {/* Data Grid Header */}
      <div className="mb-2 flex gap-4">
        <Skeleton className="h-40 w-1/2" />
        <Skeleton className="h-40 w-1/2" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
