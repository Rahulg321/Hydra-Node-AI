import { Skeleton } from "@/components/ui/skeleton";

export default function PricingSkeleton() {
  return (
    <div className="relative min-h-screen pt-12">
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-6 h-12 w-[300px] sm:h-14" />
            <Skeleton className="mx-auto mb-12 h-6 w-[80%] sm:w-[70%]" />
          </div>

          {/* Pricing Cards Skeleton */}
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl dark:bg-dark-card"
              >
                {/* Icon Skeleton */}
                <Skeleton className="mb-4 h-12 w-12 rounded-lg" />

                {/* Title and Description */}
                <Skeleton className="mb-2 h-8 w-32" />
                <Skeleton className="mb-6 h-4 w-48" />

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* CTA Button */}
                <Skeleton className="mb-8 h-12 w-full rounded-lg" />

                {/* Features List */}
                <div className="space-y-4">
                  {[...Array(6)].map((_, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Skeleton className="mx-auto mb-12 h-10 w-64" />
            <div className="space-y-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 dark:bg-dark-card"
                >
                  <Skeleton className="mb-2 h-6 w-[70%]" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
    </div>
  );
}
