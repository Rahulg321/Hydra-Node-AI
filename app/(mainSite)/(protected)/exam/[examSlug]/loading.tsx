import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="narrow-container space-y-4">
        <Skeleton className="h-6 w-1/3" />

        <Skeleton className="h-8 w-3/4" />
      </div>
      <div className="grid min-h-screen grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {/* Left Column: Information */}
        <div className="space-y-4">
          {/* Date */}
          <Skeleton className="h-6 w-1/3" />

          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />

          {/* Buttons */}
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-32 w-3/4" />
        </div>

        {/* Right Column: Cards */}
        <div>
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
