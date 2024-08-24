import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="container content-center">
        <h3>Sign Up For Hydranode Platform</h3>
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
      <div className="relative">
        <Image
          src={"/auth/loginSignupImage.png"}
          alt="blue background wavy for authentication pages"
          className="object-cover"
          fill
        />
      </div>
    </section>
  );
};

export default page;
