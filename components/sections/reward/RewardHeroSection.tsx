import React from "react";
import { FaStar } from "react-icons/fa6";

const RewardHeroSection = () => {
  return (
    <section className="block-space-large bg-[#110C1F] text-white">
      <div className="text-center">
        <div className="mb-4 mt-4 flex items-center justify-center">
          <FaStar className="mr-2 size-6 text-yellow-400" />
          <span className="text-xl tracking-wide text-[#BEBFFF]">
            Know all about our Rewards
          </span>
        </div>
        <h1 className="leading-loose">
          Your Gateway to Exclusive <br />{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Perks
          </span>{" "}
          and{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Benefits
          </span>
        </h1>
      </div>
    </section>
  );
};

export default RewardHeroSection;
