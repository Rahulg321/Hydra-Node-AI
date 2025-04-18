import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Header Skeleton */}
      <Skeleton className="mb-8 h-8 w-36 bg-gray-800" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account Info Section Skeleton */}
        <div className="rounded-xl border border-gray-800 p-6">
          <Skeleton className="mb-6 h-6 w-40 bg-gray-800" />

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              {/* First Name Label and Input */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-24 bg-gray-800" />
                <Skeleton className="h-12 w-full rounded-md bg-gray-800" />
              </div>

              {/* Last Name Label and Input */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-24 bg-gray-800" />
                <Skeleton className="h-12 w-full rounded-md bg-gray-800" />
              </div>

              {/* Update Button */}
              <Skeleton className="mt-4 h-12 w-full rounded-md bg-gray-800" />
            </div>

            <div className="flex items-center justify-center">
              {/* Profile Picture */}
              <div className="relative">
                <Skeleton className="h-32 w-32 rounded-full bg-gray-800" />
                <Skeleton className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section Skeleton */}
        <div className="rounded-xl border border-gray-800 p-6">
          <Skeleton className="mb-6 h-6 w-32 bg-gray-800" />

          <div className="space-y-6">
            {/* LinkedIn Input */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-28 rounded-md bg-gray-800" />
              <Skeleton className="h-12 flex-1 rounded-md bg-gray-800" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-6 bg-gray-800" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-28 rounded-md bg-gray-800" />
                <Skeleton className="h-12 flex-1 rounded-md bg-gray-800" />
              </div>
            </div>

            {/* Update Social Links Button */}
            <Skeleton className="mt-4 h-12 w-full rounded-md bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Login Info Section Skeleton */}
      <div className="mt-6 rounded-xl border border-gray-800 p-6">
        <Skeleton className="mb-6 h-6 w-32 bg-gray-800" />
        <Skeleton className="h-10 w-36 rounded-md bg-gray-800" />
      </div>
    </div>
  );
}
