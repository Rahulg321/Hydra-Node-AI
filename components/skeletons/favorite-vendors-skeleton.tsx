import { Skeleton } from "@/components/ui/skeleton";

export default function FavoriteVendorsCardSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-6 text-white">
      <div className="mb-6 flex items-center gap-2">
        {/* Skeleton for the icon */}
        <Skeleton className="h-6 w-6 rounded-sm bg-muted" />

        {/* Skeleton for the "FAVORITE VENDORS" text */}
        <Skeleton className="h-4 w-40 bg-muted" />
      </div>

      <div className="space-y-4">
        {/* Generate 5 skeleton rows for vendors */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Skeleton for vendor name */}
            <Skeleton className="h-4 w-24 bg-muted" />

            {/* Skeleton for bar - varying widths */}
            <Skeleton
              className="h-2 flex-1 rounded-full bg-muted"
              style={{
                maxWidth: `${100 - index * 15}%`,
              }}
            />

            {/* Skeleton for count */}
            <Skeleton className="h-4 w-4 bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
