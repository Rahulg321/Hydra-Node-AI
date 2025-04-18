import { Skeleton } from "@/components/ui/skeleton";

export default function AverageTimeCardSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-6 text-white">
      <div className="mb-4 flex items-center gap-2">
        {/* Skeleton for the flag icon */}
        <Skeleton className="h-6 w-6 rounded-sm bg-muted" />

        {/* Skeleton for the "AVERAGE SCORE" text */}
        <Skeleton className="h-4 w-36 bg-muted" />
      </div>

      {/* Skeleton for the large percentage number */}
      <Skeleton className="h-16 w-28 bg-muted" />
    </div>
  );
}
