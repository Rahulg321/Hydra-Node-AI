import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import VisionMissionSection from "@/components/sections/about/VisionMissionSection";
import WhoCanTry from "@/components/sections/about/WhoCanTry";
import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <AboutHeroSection />
      <VisionMissionSection />
      <WhoCanTry />
    </React.Fragment>
  );
};

export default page;
