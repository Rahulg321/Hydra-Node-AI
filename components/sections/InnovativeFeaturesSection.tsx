import React from "react";
import { IoTrophy } from "react-icons/io5";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";

const InnovativeFeaturesSection = () => {
  return (
    <section className="block-space bg-base">
      <div className="big-container">
        <h2>Explore our innovative features</h2>
        <span>
          Unlock the essence of our offerings with these key highlights,
          showcasing the most impactful features and benefits tailored for you.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
        <div className="text-center">
          <ReusbaleButton className="">Get a Free Trial</ReusbaleButton>
        </div>
      </div>
    </section>
  );
};

export default InnovativeFeaturesSection;

function FeatureCard() {
  return (
    <div className="bg-white rounded-xl p-4 md:px-6 md:py-10">
      <div className="text-3xl">
        <IoTrophy />
      </div>
      <div>
        <h3>Rewards & Certifications</h3>
        <span>
          Earn verifiable, blockchain-verified certificates that ensure global
          recognition and authenticity, opening doors to career opportunities.
        </span>
      </div>
    </div>
  );
}
