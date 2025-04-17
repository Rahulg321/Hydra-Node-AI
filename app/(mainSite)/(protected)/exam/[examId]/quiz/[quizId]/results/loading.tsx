import { Skeleton } from "@/components/ui/skeleton";

export default function ExamResultsSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="space-y-6 md:col-span-1">
            <div className="rounded-lg bg-orange-600 p-4 text-center">
              <Skeleton className="mx-auto mb-2 h-5 w-24 bg-orange-500/50" />
              <Skeleton className="mx-auto h-8 w-32 bg-orange-500/50" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square rounded-lg bg-yellow-500/50"
                />
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="space-y-8 rounded-lg bg-zinc-900 p-6 md:col-span-3">
            {/* Header */}
            <Skeleton className="h-10 w-3/4 bg-zinc-800/50" />

            {/* Exam score section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-40 bg-zinc-800/50" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-40 bg-zinc-800/50" />
                <Skeleton className="h-8 w-20 rounded-full bg-red-600/50" />
              </div>
            </div>

            {/* Date */}
            <Skeleton className="h-6 w-56 bg-zinc-800/50" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg bg-zinc-800/50" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-zinc-800/50" />
                    <Skeleton className="h-5 w-8 bg-zinc-800/50" />
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="flex justify-end">
              <Skeleton className="h-40 w-40 rounded-full bg-yellow-500/50" />
            </div>

            {/* Action buttons */}
            <div className="flex justify-between pt-4">
              <Skeleton className="h-10 w-32 rounded-lg bg-zinc-800/50" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32 rounded-lg bg-zinc-800/50" />
                <Skeleton className="h-10 w-32 rounded-lg bg-orange-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
