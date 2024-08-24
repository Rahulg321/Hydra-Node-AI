import PricingCardSection from "@/components/sections/pricing/pricing-cards";
import PricingHero from "@/components/sections/pricing/PricingHero";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <PricingHero />
      <PricingCardSection />
    </React.Fragment>
  );
};

export default page;
