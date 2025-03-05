import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import VisionSection from "@/components/sections/VisionSection";

import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";

import OurPartners from "@/components/sections/OurPartners";
import db from "@/lib/db";
import { Metadata } from "next";
import Features from "@/components/sections/Features";
import Solutions from "@/components/sections/Solutions";
import SocialProof from "@/components/sections/SocialProof";
import { auth } from "@/auth";
import PushNotificationManager from "@/components/PushNotificationManager";
import InstallPrompt from "@/components/InstallPrompt";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  const userSession = await auth();
  console.log("user session", userSession);

  return (
    <React.Fragment>
      {/* <PushNotificationManager />
      <InstallPrompt /> */}
      <HeroSection session={userSession} />
      <OurPartners />
      <Features session={userSession} />
      <VisionSection />
      <Solutions />
      <UseCasesSection />
      <SocialProof />
      <FeaturedBlogsSection />
    </React.Fragment>
  );
}
