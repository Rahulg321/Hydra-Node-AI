import ChampionReward from "@/components/sections/reward/ChampionReward";
import EarnRewards from "@/components/sections/reward/EarnRewards";
import LookRewards from "@/components/sections/reward/LookRewards";
import RewardHeroSection from "@/components/sections/reward/RewardHeroSection";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reward",
  description: "View all types of records you can earn with HydraNode",
};

const RewardsPage = () => {
  return (
    <React.Fragment>
      <RewardHeroSection />
      <LookRewards />
      <EarnRewards />
      <ChampionReward />
    </React.Fragment>
  );
};

export default RewardsPage;
