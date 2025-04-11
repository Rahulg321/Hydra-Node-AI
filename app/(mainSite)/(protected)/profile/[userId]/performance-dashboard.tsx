import { CompletedExamsCard } from "@/components/completed-exams-card";
import { AverageScoreCard } from "@/components/average-score-card";
import { FavoriteVendorsCard } from "@/components/favorite-vendors-card";
import { SuccessRatioCard } from "@/components/success-ratio-card";
import { AverageTimeCard } from "@/components/average-time-card";
import { BestPerformanceCard } from "@/components/best-performance-card";

export function PerformanceDashboard() {
  // Sample data - in a real app, this would come from an API or props
  const stats = {
    completedExams: 255,
    averageScore: 79,
    favoriteVendors: [
      { name: "Google", count: 8 },
      { name: "Microsoft", count: 5 },
      { name: "Oracle", count: 2 },
      { name: "Cisco", count: 2 },
      { name: "Nvidia", count: 1 },
    ],
    successRatio: {
      passed: 210,
      failed: 45,
    },
    averageTime: {
      hours: 1,
      minutes: 45,
    },
    bestPerformance: {
      score: 98,
      duration: {
        hours: 1,
        minutes: 7,
      },
      vendor: "Google",
      certificate: "AI ML Engineering",
    },
  };

  return (
    <div className="block-space px-2 md:px-6">
      <h2 className="transducer-font mb-6 uppercase tracking-wider">
        MY PERFORMANCE
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
        <CompletedExamsCard
          count={stats.completedExams}
          className="row-span-1"
        />
        <FavoriteVendorsCard
          vendors={stats.favoriteVendors}
          className="row-span-2"
        />
        <SuccessRatioCard
          passed={stats.successRatio.passed}
          failed={stats.successRatio.failed}
          className="row-span-2"
        />
        <AverageTimeCard
          hours={stats.averageTime.hours}
          minutes={stats.averageTime.minutes}
          className="row-span-1"
        />
        <AverageScoreCard score={stats.averageScore} className="row-span-2" />
        <BestPerformanceCard
          score={stats.bestPerformance.score}
          durationHours={stats.bestPerformance.duration.hours}
          durationMinutes={stats.bestPerformance.duration.minutes}
          vendor={stats.bestPerformance.vendor}
          certificate={stats.bestPerformance.certificate}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
}
