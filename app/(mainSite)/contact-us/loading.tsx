import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center">
          <Skeleton className="mx-auto mb-4 h-8 w-48" />
          <Skeleton className="mx-auto mb-8 h-4 w-[600px] max-w-full" />
        </div>

        {/* Contact Form Card */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-dark-card">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Section - Contact Information */}
            <div className="bg-primary/5 px-6 py-10 dark:bg-primary/10 sm:px-10">
              {/* Contact Info Header */}
              <Skeleton className="mb-4 h-6 w-40" />
              <Skeleton className="mb-8 h-4 w-64" />

              {/* Contact Details */}
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-24" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <Skeleton className="mb-4 h-5 w-32" />
                <div className="flex gap-4">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-8 w-8 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="px-6 py-10 sm:px-10">
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Skeleton className="mb-2 h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Skeleton className="mb-2 h-4 w-20" />
                  <Skeleton className="h-32 w-full rounded-md" />
                </div>

                {/* Submit Button */}
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-card"
            >
              <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
              <Skeleton className="mb-2 h-5 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
