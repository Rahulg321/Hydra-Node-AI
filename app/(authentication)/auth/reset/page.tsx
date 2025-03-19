import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import AuthHeroSection from "../../auth-hero-section";

const PasswordResetPage = () => {
  return (
    <section className="flex min-h-screen flex-col md:flex-row">
      <AuthHeroSection />
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2>Reset Your Password</h2>
            <span className="mt-2 block font-semibold text-gray-400">
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
