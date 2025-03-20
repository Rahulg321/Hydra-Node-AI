import React from "react";
import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";
import { Metadata } from "next";
import Features from "@/components/sections/Features";
import PricingCards from "./pricing/pricing-cards";
import ProblemStatement from "@/components/sections/ProblemStatement";
import HowItWorks from "@/components/sections/how-it-works";
import ExamPrepFeatures from "@/components/sections/exam-prep-features";
import TestimonialGrid from "@/components/sections/testimonial-grid";
import CTASection from "@/components/sections/cta-section";
import FAQHydranodeSection from "@/components/sections/faq-hydranode";
import CTABanner from "@/components/sections/cta-banner";
import CertificationsLogo from "@/components/sections/certifications-logos";
import CertificationsChallenges from "@/components/sections/certifications-challenges";
import CertificationHero from "@/components/sections/HeroSection";
import Image from "next/image";
import Flash from "@/public/illustrations/flash.png";
import Popup1 from "@/public/illustrations/popup-1.png";
import Popup2 from "@/public/illustrations/popup-2.png";
import Popup3 from "@/public/illustrations/popup-3.png";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  return (
    <React.Fragment>
      {/* <LampDemo /> */}
      <CertificationHero />
      <div className="big-container block-space relative z-0">
        <Image src={Flash} alt="flash" />
        <div className="absolute right-[-138] top-48 z-10">
          <Image src={Popup1} alt="popup1" width={250} height={250} />
        </div>
        <div className="absolute left-[-164] top-72 z-10">
          <Image src={Popup2} alt="popup1" width={250} height={250} />
        </div>
        <div className="absolute bottom-48 right-[-138] z-10">
          <Image src={Popup3} alt="popup1" width={250} height={300} />
        </div>
      </div>
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
