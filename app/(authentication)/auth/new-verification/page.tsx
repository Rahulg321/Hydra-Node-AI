import NewVerificationForm from "@/components/forms/NewVerificationForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import AuthHeroSection from "../../auth-hero-section";

export const metadata: Metadata = {
  title: "New Verification",
  description: "Verify your email address",
};

const NewVerificationPage = () => {
  return (
    <section className="flex flex-col md:flex-row">
      <AuthHeroSection
        headline="Welcome Back To The HydraNode"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-white">Email Verification</h2>
            <span className="text-sm text-gray-400">
              Verifying your Email Address
            </span>
          </div>
          <Suspense>
            <NewVerificationForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default NewVerificationPage;
