import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import React, { Suspense } from "react";
import AuthHeroSection from "../../auth-hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const PasswordResetPage = () => {
  return (
    <section className="flex flex-col md:flex-row">
      <AuthHeroSection
        headline="Join HydraNode - Simplify Your Certifications"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-white">Reset Your Password</h2>
            <span className="mt-2 block text-gray-400">
              Enter your email address below to reset your password.
            </span>
            <div className="mt-4">
              <Suspense>
                <ResetPasswordForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;
