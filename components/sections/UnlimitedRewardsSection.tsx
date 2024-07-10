import React from "react";
import Trophies from "@/public/two_trophies.png";
import Image from "next/image";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";

const UnlimitedRewardsSection = () => {
  return (
    <section className="bg-[#040011] text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image src={Trophies} alt="trophies" />
        </div>
        <div>
          <h2>Dont miss this opportunity of Earning Unlimited Rewards</h2>
          <span className="text-[#BBB5E0]">
            Improve your competitive skills and earn unlimited rewards. Explore
            the test of your need and get benefited both way.
          </span>
          <ReusbaleButton>Get Started</ReusbaleButton>
          <ReusbaleButton>Learn More</ReusbaleButton>
        </div>
      </div>
    </section>
  );
};

export default UnlimitedRewardsSection;
