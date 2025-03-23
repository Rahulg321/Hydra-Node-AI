import Image from "next/image";
import React from "react";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";
import Link from "next/link";

const AuthHeroSection = () => {
  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-8 text-center text-white md:p-12"
      style={{}}
    >
      <div className="relative z-10 mt-20 max-w-xl">
        <div className="mb-4 flex justify-center">
          <Link
            className="flex items-center gap-2 text-xl font-semibold"
            href={"/"}
          >
            <Image
              src={HydranodeWhiteLogo}
              alt="hydranode logo"
              className="block object-cover"
            />
            HydraNode
          </Link>
        </div>

        <h1 className="transducer-font hsl-white mb-6 font-sans text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl">
          WELCOME TO HYDRANODE
        </h1>

        <p className="mb-12 text-gray-200">
          Experience the future of exam preparation with Hydranode&apos;s
          advanced AI technology. Get realistic practice, instant feedback, and
          personalized learning paths.
        </p>

        <Image
          src={"/auth/auth-hero12.png"}
          width={600}
          height={600}
          alt="auth layout"
        />
      </div>
    </div>
  );
};

export default AuthHeroSection;
