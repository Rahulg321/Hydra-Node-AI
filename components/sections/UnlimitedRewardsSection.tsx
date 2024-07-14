import React from "react";
import Trophies from "@/public/two_trophies.png";
import Image from "next/image";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import PrimaryButton from "../ComponentButtons/PrimaryButton";

const UnlimitedRewardsSection = () => {
  return (
    <section className="block-space bg-[#040011] text-white">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <Image src={Trophies} alt="trophies" />
        </div>
        <div className="content-center text-right">
          <h2>
            Dont miss this opportunity of <br />{" "}
            <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Earning Unlimited Rewards
            </span>
          </h2>
          <p className="text-[#BBB5E0]">
            Improve your competitive skills and earn unlimited rewards. Explore
            the <br /> test of your need and get benefited both way.
          </p>
          <div className="mt-6 space-x-2">
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnlimitedRewardsSection;
