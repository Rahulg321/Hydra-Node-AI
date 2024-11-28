import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoginBackground from "@/public/auth/loginSignupImage.png";
import LogoDark from "@/public/logo-dark.svg";
import LogoLight from "@/public/logo-light.svg";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your hydranode account",
};

const LoginPage = () => {
  return (
    <div className="block-space-large container relative content-center">
      <div className="absolute right-4 top-4">
        <Link href={"/"}>
          <Image
            src={LogoDark}
            alt="Hydranode"
            width={150}
            height={150}
            className="h-8 dark:hidden"
          />
          <Image
            src={LogoLight}
            width={150}
            height={150}
            alt="Hydranode"
            className="hidden h-8 dark:block"
          />
        </Link>
      </div>
      <div className="mx-auto max-w-xl">
        <h3>Welcome to Hydranode </h3>
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="mt-4 text-center">
          <p>
            Need an account?
            <Link href="/signup" className="ml-1 text-blue-500 underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
