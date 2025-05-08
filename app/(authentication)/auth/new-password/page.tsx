import NewPasswordForm from "@/components/forms/NewPasswordForm";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import AuthHeroSection from "../../auth-hero-section";
import { GradientButton } from "@/components/buttons/gradient-button";

const ResetPasswordPage = async (props: {
  params: Promise<{}>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  let paramsToken = searchParams?.token;
  let dbToken;

  if (paramsToken) {
    dbToken = await getPasswordResetTokenByToken(paramsToken as string);
  }

  if (!dbToken) {
    return (
      <section className="flex flex-col md:flex-row">
        <AuthHeroSection
          headline="Join HydraNode - Simplify Your Certifications"
          tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
        />
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="mt-8 text-center">
            <h1 className="mb-2 font-semibold">Reset Your Password</h1>
            <p className="mb-4 text-gray-600">Enter your updated password</p>
            <p className="mb-6 text-red-600">
              The token is invalid or has expired. Please request a new password
              reset link.
            </p>
            <GradientButton asChild>
              <Link href="/auth/reset" className="">
                Request New Password Reset
              </Link>
            </GradientButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row">
      <AuthHeroSection
        headline="Join HydraNode - Simplify Your Certifications"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <h2>Set up a new Password</h2>
        <h3 className="">
          Email:- <span className="text-baseC">{dbToken.email}</span>
        </h3>
        <p>Enter your new password below.</p>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
