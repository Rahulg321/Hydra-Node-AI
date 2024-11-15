import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import VisionSection from "@/components/sections/VisionSection";
import TechnologyBehindSuccessSection from "@/components/sections/TechnologyBehindSuccessSection";
import UserReviewSection from "@/components/sections/UserReviewSection";
import UnlimitedRewardsSection from "@/components/sections/UnlimitedRewardsSection";
import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";
import FAQSection from "@/components/sections/FAQSection";
import HomeContactSection from "@/components/sections/HomeContactSection";
import InnovativeFeaturesSection from "@/components/sections/InnovativeFeaturesSection";
import VideoGuideSection from "@/components/sections/VideoGuideSection";
import OurPartners from "@/components/sections/OurPartners";
import db from "@/lib/db";
import { Metadata } from "next";
import Features from "@/components/sections/Features";
import Solutions from "@/components/sections/Solutions";
import SocialProof from "@/components/sections/SocialProof";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <OurPartners />
      <Features />
      <VisionSection />
      <Solutions />
      <UseCasesSection />
      <SocialProof />
      <FeaturedBlogsSection />
    </React.Fragment>
  );
}
