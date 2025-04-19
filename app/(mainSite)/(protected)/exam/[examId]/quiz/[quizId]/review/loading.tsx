import { Skeleton } from "@/components/ui/skeleton";

export default function QuizLoading() {
  return (
    <div className="flex h-screen flex-col bg-black text-white md:flex-row">
      {/* Left sidebar */}
      <div className="w-full border-b border-gray-800 p-4 md:w-64 md:border-b-0 md:border-r">
        <h2 className="mb-6 text-xl font-bold">Quiz Overview</h2>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-md bg-muted" />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32 bg-muted" />
            <Skeleton className="h-6 w-16 bg-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full bg-muted" />
            <Skeleton className="h-6 w-24 rounded-full bg-muted" />
            <Skeleton className="h-6 w-24 rounded-full bg-muted" />
          </div>
        </div>

        <div className="mb-4">
          <Skeleton className="mb-2 h-6 w-40 bg-muted" />
        </div>

        <div className="mb-6">
          <Skeleton className="mb-4 h-20 w-full bg-muted" />
          <div className="ml-4 space-y-2 md:ml-8">
            <Skeleton className="h-6 w-full max-w-2xl bg-muted" />
            <Skeleton className="h-6 w-full max-w-2xl bg-muted" />
            <Skeleton className="h-6 w-full max-w-2xl bg-muted" />
          </div>
        </div>

        <div className="mb-4">
          <Skeleton className="h-6 w-full max-w-2xl bg-muted" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 p-3 md:p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-muted" />
                <Skeleton className="h-6 w-full max-w-2xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
