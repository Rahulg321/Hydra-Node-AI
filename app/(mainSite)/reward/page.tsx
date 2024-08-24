import ChampionReward from "@/components/sections/reward/ChampionReward";
import EarnRewards from "@/components/sections/reward/EarnRewards";
import LookRewards from "@/components/sections/reward/LookRewards";
import RewardHeroSection from "@/components/sections/reward/RewardHeroSection";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <RewardHeroSection />
      <LookRewards />
      <EarnRewards />
      <ChampionReward />
    </React.Fragment>
  );
};

export default page;
