import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen space-x-6 p-6">
      {/* Left Column (Smaller Width) */}
      <div className="w-1/4 space-y-4">
        {/* Timer Skeleton */}
        <Skeleton className="mx-auto h-12 w-3/4" />

        {/* Button Skeletons */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mt-4 flex gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Right Column (Larger Width) */}
      <div className="w-3/4 space-y-6">
        {/* Heading Skeleton */}
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/3" />

        {/* Options Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-12 w-1/3" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
