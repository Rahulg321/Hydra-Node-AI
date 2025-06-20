import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import LoginBackground from "@/public/auth/loginSignupImage.png";
import LogoDark from "@/public/logos/h_logo.svg";
import LogoLight from "@/public/logos/light_logo.png";
import AuthHeroSection from "../auth-hero-section";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account on hydranode.ai",
};

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthHeroSection
        headline="Join HydraNode - Simplify Your Certifications"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <h3 className="mb-4">Sign Up For Hydranode Platform</h3>
        <Suspense>
          <SignupForm />
        </Suspense>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
