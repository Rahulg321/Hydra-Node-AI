import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Profile Sidebar Skeleton */}
          <div className="md:col-span-1">
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card">
              <div className="text-center">
                <Skeleton className="mx-auto aspect-square h-[150px] w-[150px] rounded-full" />
                <div className="mt-4 space-y-4">
                  <Skeleton className="mx-auto h-9 w-full max-w-[200px]" />
                  <div className="space-y-2">
                    <Skeleton className="mx-auto h-5 w-40" />
                    <Skeleton className="mx-auto h-4 w-56" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-8 md:col-span-2 lg:col-span-3">
            {/* Current Plan Section Skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card">
              <div className="space-y-4">
                <Skeleton className="h-7 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <div className="space-y-3 pt-4">
                  <Skeleton className="h-10 w-full sm:w-[200px]" />
                  <Skeleton className="h-10 w-full sm:w-[240px]" />
                </div>
              </div>
            </div>

            {/* Purchased Exam History Section Skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card">
              <Skeleton className="mb-6 h-7 w-48" />
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-full max-w-[300px]" />
                      <div className="flex gap-8">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam History Section Skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-9 w-24" />
              </div>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="grid gap-4 sm:grid-cols-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History Section Skeleton */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card">
              <Skeleton className="mb-6 h-7 w-40" />
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="grid gap-4 sm:grid-cols-5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
