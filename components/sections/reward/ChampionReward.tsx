import Image from "next/image";
import React from "react";
import RedReward from "@/public/RedMedal.png";

const ChampionReward = () => {
  return (
    <section className="block-space bg-gradient-to-b from-[#AC0003] to-[#EA2123]">
      <div className="big-container text-center">
        <Image src={RedReward} alt="" className="mx-auto" />
        <h1 className="mb-4 font-bold text-white">Champion Reward</h1>
        <span className="text-white/80">
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate <br /> seamlessly and make
          the most of our features for an enriched learning experience.
        </span>
      </div>
    </section>
  );
};

export default ChampionReward;
