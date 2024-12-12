import LeaderboardHero from "@/components/sections/leaderboard/LeaderBoardHero";
import LeaderboardTable from "@/components/sections/leaderboard/LeaderboardTable";
import LeaderboardTabs from "@/components/sections/leaderboard/LeaderboardTabs";
import RecentActivity from "@/components/sections/leaderboard/RecentActivity";
import TopAchievers from "@/components/sections/leaderboard/TopAchievers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LeaderBoards",
  description: "Find out who are the top performers in HydraNode",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen">
      <LeaderboardHero />
      <div className="container mx-auto px-4 py-8">
        <LeaderboardTabs />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <LeaderboardTable />
          </div>
          <div className="space-y-8">
            <TopAchievers />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
