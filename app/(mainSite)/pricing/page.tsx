import React from "react";
import PricingCards from "./pricing-cards";

export const metadata = {
  title: "Pricing",
  description: "Choose a plan which suits you the best",
};

const PricingPage = async () => {
  console.log("inside pricing page");

  return (
    <div>
      <PricingCards />
    </div>
  );
};

export default PricingPage;
