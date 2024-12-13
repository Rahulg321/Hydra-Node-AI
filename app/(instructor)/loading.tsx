import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full space-y-10 animate-in fade-in-50">
      {/* Hero Section Skeleton */}
      <div className="container space-y-8 pb-8 pt-6 md:py-10">
        <div className="space-y-6">
          <Skeleton className="h-8 w-[250px] sm:w-[300px]" />
          <Skeleton className="h-4 w-[90%] sm:w-[60%]" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-xl border p-4">
              <Skeleton className="h-7 w-14" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid with Image Skeleton */}
      <div className="container">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group space-y-4 rounded-xl border p-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-3 w-[60%]" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[100px]" />
                  <Skeleton className="h-3 w-[60px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List View Skeleton */}
      <div className="container">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 rounded-xl border p-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[50%]" />
                <Skeleton className="h-3 w-[80%]" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-[60px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="container">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="rounded-xl border">
          <div className="grid grid-cols-4 gap-4 border-b p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 border-b p-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar with Content Skeleton */}
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="hidden space-y-6 lg:block">
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4" />
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-[200px]" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4" />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-xl border p-4">
                  <Skeleton className="h-4" />
                  <Skeleton className="h-3 w-[80%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="border-t">
        <div className="container py-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-5 w-[120px]" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-3 w-[80%]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
