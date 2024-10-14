import SignupForm from "@/components/forms/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="block-space-large relative content-center">
        <div className="absolute left-4 top-4">
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
