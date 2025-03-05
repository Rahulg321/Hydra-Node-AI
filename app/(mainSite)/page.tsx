import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import VisionSection from "@/components/sections/VisionSection";

import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";

import { Metadata } from "next";
import Features from "@/components/sections/Features";
import Solutions from "@/components/sections/Solutions";
import SocialProof from "@/components/sections/SocialProof";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  const userSession = await auth();

  return (
    <React.Fragment>
      {/* <PushNotificationManager />
      <InstallPrompt /> */}
      <HeroSection session={userSession} />
      {/* <OurPartner /> */}
      <Features session={userSession} />
      <VisionSection />
      <Solutions />
      <UseCasesSection />
      <SocialProof />
      <FeaturedBlogsSection />
    </React.Fragment>
  );
}
