import React from "react";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";
import Bounded from "@/components/Bounded";

const HeroSection = () => {
  return (
    <Bounded
      variant="wide"
      className="grid grid-cols-1 md:grid-cols-2 border-4"
    >
      <div className="">
        <h1>
          Boost your Competitive Skills <br /> and Earn Rewards
        </h1>

        <p>
          Unleash your learning potential and elevate your skills effortlessly
          with our AI-driven exam question website and earn amazing rewards
        </p>
        <div className="flex gap-4">
          <ReusbaleButton>Get a Free Trial</ReusbaleButton>
          <ReusbaleButton>Get Rewards</ReusbaleButton>
        </div>
      </div>
      <div></div>
    </Bounded>
  );
};

export default HeroSection;
