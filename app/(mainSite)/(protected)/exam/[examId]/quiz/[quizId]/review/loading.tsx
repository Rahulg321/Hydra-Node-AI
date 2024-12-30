import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ReviewMcqSkeleton = () => {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-lg" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
          <Skeleton className="h-40 w-full" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-6 lg:col-span-3">
          <Skeleton className="h-8 w-64" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-8 w-24" />
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <div className="space-x-4">
              <Skeleton className="inline-block h-10 w-32" />
              <Skeleton className="inline-block h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewMcqSkeleton;
