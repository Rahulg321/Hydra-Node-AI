import Image from "next/image";
import React from "react";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";
import Link from "next/link";
import AuthFlash from "@/public/illustrations/flash.png";

const AuthHeroSection = ({
  headline,
  tagline,
}: {
  headline: string;
  tagline: string;
}) => {
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

        <h1 className="transducer-font mb-6 font-bold tracking-wider">
          {headline}
        </h1>

        <p className="mb-12 text-gray-300">{tagline}</p>

        <Image src={AuthFlash} alt="auth layout" />
      </div>
    </div>
  );
};

export default AuthHeroSection;
