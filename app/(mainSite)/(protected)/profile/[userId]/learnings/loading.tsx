import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Exams History</h1>
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
            <span className="text-gray-400">Loading exams...</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-800 bg-gray-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500/30"></div>
                <div className="h-8 w-3/4 rounded bg-gray-700/50"></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-5 w-1/3 rounded bg-gray-700/50"></div>
                  <div className="h-5 w-1/4 rounded bg-gray-700/50"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-5 w-2/5 rounded bg-gray-700/50"></div>
                  <div className="h-5 w-1/3 rounded bg-gray-700/50"></div>
                </div>

                <div className="mt-4 h-6 w-1/3 rounded bg-orange-500/30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
