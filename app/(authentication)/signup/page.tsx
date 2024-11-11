import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginBackground from "@/public/auth/loginSignupImage.png";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account on hydranode.ai",
};

const SignUpPage = () => {
  return (
    <div className="block-space-large relative content-center">
      <div className="absolute right-4 top-4">
        <Link href={"/"}>
          <Image
            src={"/hydranode_logo.png"}
            alt="official logo for hydranode"
            className="object-cover"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="mx-auto max-w-xl">
        <h3 className="mb-4">Sign Up For Hydranode Platform</h3>
        <SignupForm />
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
