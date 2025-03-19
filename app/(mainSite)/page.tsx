import React from "react";
import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";
import { Metadata } from "next";
import Features from "@/components/sections/Features";
import TechStack from "@/components/sections/TechStack";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingCards from "./pricing/pricing-cards";
import { auth } from "@/auth";
import ProblemStatement from "@/components/sections/ProblemStatement";
import HowItWorks from "@/components/sections/how-it-works";
import HeroSection from "@/components/sections/HeroSection";
import ExamPrepFeatures from "@/components/sections/exam-prep-features";
import TestimonialGrid from "@/components/sections/testimonial-grid";
import CTASection from "@/components/sections/cta-section";
import FAQHydranodeSection from "@/components/sections/faq-hydranode";
import CTABanner from "@/components/sections/cta-banner";
import CertificationsLogo from "@/components/sections/certifications-logos";
import CertificationsChallenges from "@/components/sections/certifications-challenges";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  const userSession = await auth();
  return (
    <React.Fragment>
      <HeroSection />
      <CertificationsLogo />
      <CertificationsChallenges />

      <Features />
      <HowItWorks />
      <ExamPrepFeatures />
      {/* <TechStack /> */}
      <PricingCards />
      <TestimonialGrid />
      <FeaturedBlogsSection />
      <FAQHydranodeSection />
      <CTASection />
      <CTABanner />
    </React.Fragment>
  );
}
