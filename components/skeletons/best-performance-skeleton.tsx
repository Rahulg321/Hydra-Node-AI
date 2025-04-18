import { Skeleton } from "@/components/ui/skeleton";

export default function BestPerformanceCardSkeleton() {
  return (
    <div className="w-full max-w-4xl rounded-2xl bg-black p-6 text-white">
      <div className="mb-6 flex items-center gap-2">
        {/* Skeleton for the trophy icon */}
        <Skeleton className="h-6 w-6 rounded-sm bg-muted" />

        {/* Skeleton for the "BEST PERFORMANCE" text */}
        <Skeleton className="h-4 w-40 bg-muted" />
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div className="mr-8 flex flex-col">
          {/* Skeleton for score */}
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-10 w-20 bg-muted" />
            <Skeleton className="h-4 w-12 bg-muted" />
          </div>
        </div>

        <div className="mr-8 flex flex-col">
          {/* Skeleton for duration */}
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-10 w-20 bg-muted" />
            <Skeleton className="h-4 w-16 bg-muted" />
          </div>
        </div>

        <div className="mt-4 sm:mt-0">
          <div className="flex flex-col gap-8 sm:flex-row">
            <div>
              {/* Skeleton for vendor label */}
              <Skeleton className="mb-2 h-4 w-14 bg-muted" />
              {/* Skeleton for vendor value */}
              <Skeleton className="h-6 w-20 bg-muted" />
            </div>

            <div>
              {/* Skeleton for certificate label */}
              <Skeleton className="mb-2 h-4 w-20 bg-muted" />
              {/* Skeleton for certificate value */}
              <Skeleton className="h-6 w-40 bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
