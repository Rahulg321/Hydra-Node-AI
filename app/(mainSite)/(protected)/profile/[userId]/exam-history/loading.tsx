import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="block-space narrow-container p-4">
      {/* Heading */}
      <Skeleton className="mb-2 h-8 w-1/3" />

      {/* Subtitle */}
      <Skeleton className="mb-4 h-6 w-1/2" />

      {/* Data Grid Header */}
      <div className="mb-2 flex">
        <Skeleton className="mr-2 h-6 w-1/4" />
        <Skeleton className="mr-2 h-6 w-1/4" />
        <Skeleton className="mr-2 h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      {/* Data Grid Rows */}
      {[...Array(8)].map((_, index) => (
        <div key={index} className="mb-4 flex">
          <Skeleton className="mr-2 h-6 w-1/4" />
          <Skeleton className="mr-2 h-6 w-1/4" />
          <Skeleton className="mr-2 h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
