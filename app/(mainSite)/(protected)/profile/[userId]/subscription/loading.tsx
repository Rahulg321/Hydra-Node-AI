"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionLoading() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-xl font-medium">Subscription</h1>

      <div className="overflow-hidden rounded-lg border border-gray-800">
        <div className="p-4 px-6 text-sm font-medium uppercase">
          VIEW AND MANAGE SUBSCRIPTION
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#3a3530] text-left">
                <th className="p-4 font-normal">Subscription</th>
                <th className="p-4 font-normal">Last payment</th>
                <th className="p-4 font-normal">Upcoming payment</th>
                <th className="p-4 font-normal">Payment method</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="border-t border-gray-800">
                  <td className="p-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-700" />
                      <Skeleton className="h-3 w-12 bg-gray-700" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-gray-700" />
                      <Skeleton className="h-3 w-20 bg-gray-700" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-gray-700" />
                      <Skeleton className="h-3 w-32 bg-gray-700" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-12 rounded-md bg-gray-700" />
                      <Skeleton className="h-4 w-20 bg-gray-700" />
                    </div>
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
                  </td>
                </tr>
              ) : (
                <tr className="border-t border-gray-800">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">Pro Plan</div>
                      <div className="text-sm text-gray-400">Yearly</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div>1st Apr, 2025</div>
                      <div className="text-sm text-red-500">View invoice</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div>1st Apr, 2026</div>
                      <div className="text-sm text-red-500">
                        View payment details
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-10 rounded-md bg-gradient-to-r from-[#ff5f00] via-[#ff5f00] to-[#ff5f00]"></div>
                      <div>------6789</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>Active</div>
                  </td>
                  <td className="p-4">
                    <Info className="h-5 w-5 text-gray-400" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading overlay that fades out */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex animate-pulse items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-white">Loading subscription data...</p>
          </div>
        </div>
      )}
    </div>
  );
}
