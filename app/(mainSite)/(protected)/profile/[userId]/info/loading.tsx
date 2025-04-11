import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

      {/* Account Info Section */}
      <div className="mb-6 rounded-lg bg-zinc-900 p-6">
        <h2 className="mb-6 text-lg uppercase tracking-wider">Account Info</h2>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1 space-y-4">
            <div>
              <p className="mb-1">First Name</p>
              <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
            </div>

            <div>
              <p className="mb-1">Last Name</p>
              <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-1">Image</p>
            <Skeleton className="h-24 w-24 rounded-full bg-zinc-800" />
            <Skeleton className="mt-2 h-4 w-28 bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Social Info Section */}
      <div className="mb-6 rounded-lg bg-zinc-900 p-6">
        <h2 className="mb-6 text-lg uppercase tracking-wider">Social Info</h2>

        <div className="space-y-4">
          <div>
            <p className="mb-1">LinkedIn</p>
            <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
          </div>

          <div>
            <p className="mb-1">X</p>
            <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Login Info Section */}
      <div className="rounded-lg bg-zinc-900 p-6">
        <h2 className="mb-6 text-lg uppercase tracking-wider">Login Info</h2>

        <div className="space-y-4">
          <div>
            <p className="mb-1">Email</p>
            <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
          </div>

          <div>
            <p className="mb-1">Password</p>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 flex-1 rounded-md bg-zinc-800" />
              <Skeleton className="h-10 w-36 rounded-md bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
