import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoginBackground from "@/public/auth/loginSignupImage.png";
import LogoDark from "@/public/logos/h_logo.svg";
import LogoLight from "@/public/logos/light_logo.png";
import AuthHeroSection from "../auth-hero-section";
import SigninGoogle from "@/components/ComponentButtons/SigninGoogle";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your hydranode account",
};

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AuthHeroSection
        headline="Welcome Back To The HydraNode"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />

      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Login to your Account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter your email & password to login to your account
            </p>
          </div>
          <Suspense>
            <SigninGoogle />
          </Suspense>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">Or</span>
            </div>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        ``
      </div>
    </div>
  );
};

export default LoginPage;
