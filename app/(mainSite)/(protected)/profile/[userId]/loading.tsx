import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      {/* Header skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Exams History section */}
      <div className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-8 w-20 animate-pulse rounded bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-lg bg-zinc-900 p-6"
            >
              <div className="mb-4 h-10 w-10 rounded-full bg-orange-500" />
              <div className="mb-3 h-5 w-48 rounded bg-muted" />
              <div className="mb-3 h-4 w-32 rounded bg-muted" />
              <div className="mb-3 h-4 w-40 rounded bg-muted" />
              <div className="flex justify-end">
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Performance section */}
      <div>
        <div className="mb-6 h-6 w-40 animate-pulse rounded bg-muted" />

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Completed Exams */}
          <div className="h-32 animate-pulse rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-orange-500" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="h-10 w-20 rounded bg-muted" />
          </div>

          {/* Favorite Vendors */}
          <div className="h-64 animate-pulse rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-orange-500" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-4 w-32 rounded-full bg-orange-500 opacity-70" />
                  <div className="h-4 w-4 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Success Ratio */}
          <div className="h-64 animate-pulse rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-orange-500" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="flex h-40 items-center justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-8 border-orange-500 border-b-green-500 border-r-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Average Score */}
          <div className="h-32 animate-pulse rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-orange-500" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="h-10 w-20 rounded bg-muted" />
          </div>

          {/* Average Time */}
          <div className="h-32 animate-pulse rounded-lg bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-orange-500" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
            <div className="h-10 w-32 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
