import { Skeleton } from "@/components/ui/skeleton";

export const MarketplaceExamCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-muted">
      <div className="relative aspect-video w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <div className="mb-2 flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="mb-2 flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="mb-2 flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="mb-4 flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-1/5" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
};
