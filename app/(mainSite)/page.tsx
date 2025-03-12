import React from "react";
import VisionSection from "@/components/sections/VisionSection";

import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";

import { Metadata } from "next";
import Features from "@/components/sections/Features";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import TechStack from "@/components/sections/TechStack";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingCards from "./pricing/pricing-cards";
import HeroSection from "@/components/sections/HeroSection";
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
      {/* <HeroSection
        subtitle={{
          regular: "Ace your certifications with ",
          gradient: "AI-powered precision",
        }}
        description="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
        ctaText="Start your free practice exam"
        ctaHref="#"
        bottomImage={{
          light: "https://www.launchuicomponents.com/app-light.png",
          dark: "https://www.launchuicomponents.com/app-dark.png",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      /> */}
      <HeroSection />
      <ProblemStatement />

      <Features />
      {/* <TechStack /> */}
      <PricingCards />
      <FeaturedBlogsSection />
      <section className="block-space">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            Ready to Accelerate Your IT Career?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Join over 50,000 IT professionals who&apos;ve trusted Hydranode for
            their certification success.
          </p>
          <Button variant={"default"} className="">
            Start Your Journey Today
            <ArrowBigRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </React.Fragment>
  );
}
