import React from "react";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";

const HeroSection = () => {
  return (
    <section>
      <div>
        <h1>Boost your Competitive Skills</h1>
        <h1>and Earn Rewards</h1>
        <p>
          Unleash your learning potential and elevate your skills effortlessly
          with our AI-driven exam question website and earn amazing rewards
        </p>
        <div className="flex gap-4">
          <ReusbaleButton />
          <ReusbaleButton />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default HeroSection;
