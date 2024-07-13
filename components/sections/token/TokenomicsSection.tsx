import React from "react";
import TokenPieChart from "@/public/TokenBudgetPieChart.png";
import Image from "next/image";

const TokenomicsSection = () => {
  return (
    <section className="block-space bg-[#110C1F] text-white">
      <div className="big-container">
        <div className="text-center">
          <h2>
            HydraNode{" "}
            <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>
          <p className="text-white/80">
            Unlock the essence of our offerings with these key highlights,
            showcasing <br /> the most impactful features and benefits tailored
            for you.
          </p>
        </div>
        <Image src={TokenPieChart} alt="" />
      </div>
    </section>
  );
};

export default TokenomicsSection;
