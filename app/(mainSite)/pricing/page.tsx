import PricingCardSection from "@/components/sections/pricing/pricing-cards";
import PricingHero from "@/components/sections/pricing/PricingHero";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "View our pricing plans and find the one that works for you",
};

const PricingPage = () => {
  return (
    <React.Fragment>
      <PricingHero />
      <PricingCardSection />
    </React.Fragment>
  );
};

export default PricingPage;
