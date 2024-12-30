import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuizResultsPageSkeleton = () => {
  return (
    <section className="container animate-pulse py-4">
      <Skeleton className="mb-4 h-10 w-48" />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-6 w-40" />
          <div className="mb-4 mt-2 flex items-center gap-1">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-6 w-56" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div>
                  <Skeleton className="mb-1 h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Skeleton className="h-64 w-64 rounded-full" />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-12 w-32 rounded-full" />
        <div className="space-x-4">
          <Skeleton className="inline-block h-12 w-32 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default QuizResultsPageSkeleton;
