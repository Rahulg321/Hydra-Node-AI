import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import VisionMissionSection from "@/components/sections/about/VisionMissionSection";
import WhoCanTry from "@/components/sections/about/WhoCanTry";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description: "A summary of HydraNode purpose and vision..",
};

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
