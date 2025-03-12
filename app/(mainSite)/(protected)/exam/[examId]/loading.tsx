import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column - 2/3 width on medium screens and up */}
        <div className="space-y-6 md:col-span-2">
          {/* Title card */}
          <div className="rounded-lg border bg-muted p-6 shadow-sm">
            <Skeleton className="mb-6 h-8 w-3/4" />

            {/* Exam stats grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="h-8 w-1/2" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            </div>
          </div>

          {/* Exam description card */}
          <div className="rounded-lg border bg-muted p-6 shadow-sm">
            <Skeleton className="mb-4 h-7 w-1/2" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Exam instructions card */}
          <div className="rounded-lg border bg-muted p-6 shadow-sm">
            <Skeleton className="mb-4 h-7 w-2/3" />
            <div className="space-y-4">
              <div className="flex items-start">
                <Skeleton className="mr-2 mt-1 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-start">
                <Skeleton className="mr-2 mt-1 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex items-start">
                <Skeleton className="mr-2 mt-1 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-start">
                <Skeleton className="mr-2 mt-1 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex items-start">
                <Skeleton className="mr-2 mt-1 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column - 1/3 width on medium screens and up */}
        <div className="space-y-6 md:col-span-1">
          {/* Exam available card */}
          <div className="rounded-lg border bg-muted p-6 shadow-sm">
            <div className="mb-2 flex items-center">
              <Skeleton className="mr-2 h-5 w-1/2" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Troubleshooting card */}
          <div className="rounded-lg border bg-muted p-6 shadow-sm">
            <Skeleton className="mb-4 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-4/5" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
