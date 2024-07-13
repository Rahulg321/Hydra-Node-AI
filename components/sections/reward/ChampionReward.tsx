import Image from "next/image";
import React from "react";
import RedReward from "@/public/RedMedal.png";

const ChampionReward = () => {
  return (
    <section className="block-space bg-gradient-to-b from-[#AC0003] to-[#EA2123]">
      <div className="big-container">
        <Image src={RedReward} alt="" />
        <h2>Champion Reward</h2>
        <span>
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate seamlessly and make the most
          of our features for an enriched learning experience.
        </span>
      </div>
    </section>
  );
};

export default ChampionReward;
