import { Skeleton } from "@/components/ui/skeleton";

export default function CompletedExamsCardSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-6 text-white">
      <div className="mb-4 flex items-center gap-2">
        {/* Skeleton for the checkmark icon */}
        <Skeleton className="h-6 w-6 rounded-full bg-muted" />

        {/* Skeleton for the "COMPLETED EXAMS" text */}
        <Skeleton className="h-4 w-40 bg-muted" />
      </div>

      {/* Skeleton for the large number */}
      <Skeleton className="h-16 w-20 bg-muted" />
    </div>
  );
}
