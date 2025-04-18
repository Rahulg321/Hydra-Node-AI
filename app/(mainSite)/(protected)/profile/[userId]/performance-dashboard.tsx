import { CompletedExamsCard } from "@/components/completed-exams-card";
import { AverageScoreCard } from "@/components/average-score-card";
import { FavoriteVendorsCard } from "@/components/favorite-vendors-card";
import { SuccessRatioCard } from "@/components/success-ratio-card";
import { AverageTimeCard } from "@/components/average-time-card";
import { BestPerformanceCard } from "@/components/best-performance-card";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CompletedExamsCardSkeleton from "@/components/skeletons/completed-exams-skeleton";
import AverageScoreCardSkeleton from "@/components/skeletons/average-score-skeleton";
import FavoriteVendorsCardSkeleton from "@/components/skeletons/favorite-vendors-skeleton";
import SuccessRatioCardSkeleton from "@/components/skeletons/success-ratio-skeleton";
import BestPerformanceCardSkeleton from "@/components/skeletons/best-performance-skeleton";
import AverageTimeCardSkeleton from "@/components/skeletons/average-time-skeleton";

export async function PerformanceDashboard({ userId }: { userId: string }) {
  return (
    <div className="block-space px-2 md:px-6">
      <h2 className="transducer-font mb-6 uppercase">MY PERFORMANCE</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
        <Suspense
          fallback={
            <div>
              <CompletedExamsCardSkeleton />
            </div>
          }
        >
          <CompletedExamsCard userId={userId} className="row-span-1" />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <AverageScoreCardSkeleton />
            </div>
          }
        >
          <Suspense
            fallback={
              <div>
                <FavoriteVendorsCardSkeleton />
              </div>
            }
          >
            <FavoriteVendorsCard userId={userId} className="row-span-2" />
          </Suspense>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <SuccessRatioCardSkeleton />
            </div>
          }
        >
          <SuccessRatioCard userId={userId} className="row-span-2" />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <AverageTimeCardSkeleton />
            </div>
          }
        >
          <AverageTimeCard userId={userId} className="row-span-1" />
        </Suspense>
        <Suspense
          fallback={
            <div className="row-span-2">
              <AverageScoreCardSkeleton />
            </div>
          }
        >
          <AverageScoreCard userId={userId} className="row-span-2" />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <BestPerformanceCardSkeleton />
            </div>
          }
        >
          <BestPerformanceCard userId={userId} className="md:col-span-2" />
        </Suspense>
      </div>
    </div>
  );
}
