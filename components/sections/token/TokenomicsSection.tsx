import React from "react";
import TokenPieChart from "@/public/TokenBudgetPieChart.png";
import Image from "next/image";

const TokenomicsSection = () => {
  return (
    <section className="bg-[#110C1F] block-space text-white">
      <div className="big-container">
        <h2>HydraNode Tokenomics</h2>
        <span>
          Unlock the essence of our offerings with these key highlights,
          showcasing the most impactful features and benefits tailored for you.
        </span>
        <Image src={TokenPieChart} alt="" />
      </div>
    </section>
  );
};

export default TokenomicsSection;
