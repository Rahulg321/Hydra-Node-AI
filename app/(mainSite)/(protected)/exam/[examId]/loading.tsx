import { Skeleton } from "@/components/ui/skeleton";

export default function CertificationLoading() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      {/* Certification Details Header */}
      <div className="mb-3">
        <Skeleton className="h-5 w-32 bg-muted/20" />
      </div>

      {/* Title */}
      <div className="mb-12">
        <Skeleton className="h-10 w-full max-w-2xl bg-muted/20" />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column - Certification Details */}
        <div className="space-y-8">
          <div>
            <Skeleton className="mb-6 h-8 w-48 bg-muted/20" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Skeleton className="mb-2 h-5 w-32 bg-muted/20" />
                <Skeleton className="h-7 w-28 bg-muted/20" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-32 bg-muted/20" />
                <Skeleton className="h-7 w-24 bg-muted/20" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-32 bg-muted/20" />
                <Skeleton className="h-7 w-32 bg-muted/20" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-32 bg-muted/20" />
                <Skeleton className="h-7 w-28 bg-muted/20" />
              </div>
            </div>
          </div>

          {/* Start Exam Button */}
          <div>
            <Skeleton className="h-10 w-32 rounded-full bg-muted/20" />
          </div>

          {/* Exam Description */}
          <div>
            <Skeleton className="mb-4 h-8 w-48 bg-muted/20" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-muted/20" />
              <Skeleton className="h-4 w-full bg-muted/20" />
              <Skeleton className="h-4 w-3/4 bg-muted/20" />
            </div>
          </div>
        </div>

        {/* Right Column - Examination Instructions */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-64 bg-muted/20" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-2 w-2 rounded-full bg-muted/20" />
                <Skeleton className="h-4 w-full bg-muted/20" />
              </div>
            ))}
          </div>

          {/* Don't see your purchased exam section */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-72 bg-muted/20" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-muted/20" />
              <Skeleton className="h-4 w-3/4 bg-muted/20" />
            </div>
            <Skeleton className="mt-4 h-10 w-40 rounded-full bg-muted/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
