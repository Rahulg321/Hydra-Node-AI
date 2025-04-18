import { Skeleton } from "@/components/ui/skeleton";

export default function SuccessRatioCardSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-6 text-white">
      <div className="mb-6 flex items-center gap-2">
        {/* Skeleton for the icon */}
        <Skeleton className="h-6 w-6 rounded-sm bg-muted" />

        {/* Skeleton for the "SUCCESS RATIO" text */}
        <Skeleton className="h-4 w-36 bg-muted" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-6">
          <div>
            {/* Skeleton for "Passed exam" text */}
            <Skeleton className="mb-2 h-4 w-24 bg-muted" />

            {/* Skeleton for passed count */}
            <Skeleton className="h-10 w-8 bg-muted" />
          </div>

          <div>
            {/* Skeleton for "Failed exam" text */}
            <Skeleton className="mb-2 h-4 w-24 bg-muted" />

            {/* Skeleton for failed count */}
            <Skeleton className="h-10 w-12 bg-muted" />
          </div>
        </div>

        {/* Skeleton for donut chart */}
        <Skeleton className="h-32 w-32 rounded-full bg-muted" />
      </div>
    </div>
  );
}
