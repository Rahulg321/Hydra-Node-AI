import React from "react";
import AboutSection from "./AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about HydraNode and our beginnings",
};

const AboutUsPage = () => {
  return (
    <div>
      <AboutSection />
    </div>
  );
};

export default AboutUsPage;
