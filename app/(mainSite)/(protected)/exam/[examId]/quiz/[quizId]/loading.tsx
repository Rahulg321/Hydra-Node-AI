import { Skeleton } from "@/components/ui/skeleton";

export default function QuizLoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white md:flex-row">
      {/* Left sidebar - stacks on mobile, side by side on md+ screens */}
      <div className="flex w-full flex-col border-b border-gray-800 p-4 md:w-60 md:border-b-0 md:border-r">
        <div className="mb-6">
          <Skeleton className="mb-2 h-8 w-24 bg-muted" />
          <Skeleton className="h-20 w-full rounded-lg bg-orange-900 md:h-24" />
        </div>

        {/* Question grid - adjusts columns based on screen size */}
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-6 rounded bg-muted md:h-8 md:w-8"
            />
          ))}
        </div>

        <div className="mb-4 mt-4 md:mb-0 md:mt-auto">
          <Skeleton className="h-10 w-full rounded-full bg-red-900 md:h-12" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <Skeleton className="mb-4 h-6 w-32 bg-muted md:h-8" />
          <Skeleton className="mb-6 h-12 w-full bg-muted md:mb-8 md:h-16" />
        </div>

        <Skeleton className="mb-4 h-5 w-36 bg-muted md:h-6 md:w-48" />

        {/* Answer options */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-14 w-full rounded-lg md:h-16 ${i === 1 ? "bg-orange-900" : "bg-muted"} mb-3 md:mb-4`}
          />
        ))}

        {/* Navigation buttons - stack on mobile, spread on larger screens */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row md:mt-12">
          <Skeleton className="h-10 w-full rounded-full bg-muted sm:w-32 md:h-12" />
          <Skeleton className="h-10 w-full rounded-full bg-muted sm:w-32 md:h-12" />
          <div className="mt-3 flex w-full gap-3 sm:mt-0 sm:w-auto md:gap-4">
            <Skeleton className="h-10 flex-1 rounded-full bg-muted sm:w-36 sm:flex-none md:h-12 md:w-40" />
            <Skeleton className="h-10 flex-1 rounded-full bg-orange-500 sm:w-36 sm:flex-none md:h-12 md:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
