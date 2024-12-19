import { MarketplaceExamCardSkeleton } from "@/components/skeletons/marketplace-exam-card-skeleton";

const MarketplaceLoadingSkeleton = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pagination Skeleton */}
        <div className="mb-6 flex justify-center">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>

        {/* Description Skeleton */}
        <div className="mb-8 h-6 w-full max-w-2xl animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>

        {/* Exam Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <MarketplaceExamCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceLoadingSkeleton;
