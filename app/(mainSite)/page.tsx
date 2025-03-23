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
import Image, { StaticImageData } from "next/image";
import Flash from "@/public/illustrations/flash.png";
import Popup1 from "@/public/illustrations/popup-1.png";
import Popup2 from "@/public/illustrations/popup-2.png";
import Popup3 from "@/public/illustrations/popup-3.png";
import ExamPrepHero from "@/components/sections/exam-prep-hero";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  return (
    <React.Fragment>
      <CertificationHero />
      <div className="relative z-0 mx-auto overflow-hidden px-4 py-12">
        <div className="big-container">
          <Image src={Flash} alt="flash" className="mx-auto w-full max-w-5xl" />
          <div className="absolute bottom-0 left-0 z-20 h-3/4 w-full bg-gradient-to-t from-black to-transparent"></div>
          <div className="right-[-5%] top-1/4 z-10 w-[150px] scale-75 transform md:absolute md:right-[-5%] md:w-[200px] md:scale-90 lg:right-[5%] lg:top-[15%] lg:w-[250px] lg:scale-100">
            <Image
              src={Popup1}
              alt="popup1"
              width={220}
              height={220}
              className="h-auto w-full"
            />
          </div>

          {/* Popup 2 - Left side */}
          <div className="left-[-5%] top-1/3 z-10 w-[150px] scale-75 transform md:absolute md:left-[-5%] md:w-[200px] md:scale-90 lg:left-[5%] lg:w-[250px] lg:scale-100">
            <Image
              src={Popup2}
              alt="popup2"
              width={220}
              height={220}
              className="h-auto w-full"
            />
          </div>

          <div className="bottom-1/4 right-[-5%] z-10 w-[150px] scale-75 transform md:absolute md:right-[-5%] md:w-[200px] md:scale-90 lg:right-[10%] lg:w-[250px] lg:scale-100">
            <Image
              src={Popup3}
              alt="popup3"
              width={220}
              height={220}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
      <CertificationsLogo />
      <CertificationsChallenges />

      {/* <ExamPrepFeatures /> */}
      <HowItWorks />
      <Features />
      <TestimonialGrid />
      <ExamPrepHero />
      <PricingCards />
      <FAQHydranodeSection />
      <FeaturedBlogsSection />
      <CTABanner />
    </React.Fragment>
  );
}
