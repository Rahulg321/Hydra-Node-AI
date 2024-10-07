import TokenHero from "@/components/sections/token/TokenHero";
import TokenHighlightSection from "@/components/sections/token/TokenHighlightSection";
import TokenomicsSection from "@/components/sections/token/TokenomicsSection";
import TokenScheduleSection from "@/components/sections/token/TokenScheduleSection";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token",
  description: "Explore acheivable tokens with HydraNode",
};

const TokenPage = () => {
  return (
    <React.Fragment>
      <TokenHero />
      <TokenHighlightSection />
      <TokenomicsSection />
      <TokenScheduleSection />
    </React.Fragment>
  );
};

export default TokenPage;
