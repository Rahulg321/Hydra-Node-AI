import { CompletedExamsCard } from "@/components/completed-exams-card";
import { AverageScoreCard } from "@/components/average-score-card";
import { FavoriteVendorsCard } from "@/components/favorite-vendors-card";
import { SuccessRatioCard } from "@/components/success-ratio-card";
import { AverageTimeCard } from "@/components/average-time-card";
import { BestPerformanceCard } from "@/components/best-performance-card";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export async function PerformanceDashboard({ userId }: { userId: string }) {
  return (
    <div className="block-space px-2 md:px-6">
      <h2 className="transducer-font mb-6 uppercase">MY PERFORMANCE</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
        <Suspense fallback={<div>Loading...</div>}>
          <CompletedExamsCard userId={userId} className="row-span-1" />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <FavoriteVendorsCard userId={userId} className="row-span-2" />
          </Suspense>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SuccessRatioCard userId={userId} className="row-span-2" />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AverageTimeCard userId={userId} className="row-span-1" />
        </Suspense>
        <Suspense
          fallback={
            <div className="row-span-2">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          }
        >
          <AverageScoreCard userId={userId} className="row-span-2" />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BestPerformanceCard userId={userId} className="md:col-span-2" />
        </Suspense>
      </div>
    </div>
  );
}
