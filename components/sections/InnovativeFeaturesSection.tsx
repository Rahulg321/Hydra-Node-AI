import React from "react";
import { IoTrophy } from "react-icons/io5";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";

const InnovativeFeaturesSection = () => {
  return (
    <section>
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
      <ReusbaleButton>Get a Free Trial</ReusbaleButton>
    </section>
  );
};

export default InnovativeFeaturesSection;

function FeatureCard() {
  return (
    <div>
      <div>
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
