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
    <div className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[rgba(89,38,13,0.9)] to-[rgba(194,65,12,0.9)] p-6 text-center text-white sm:p-8 md:min-h-0">
      <div className="relative z-10 mt-10 w-full max-w-md md:mt-8 lg:max-w-lg xl:max-w-xl">
        <div className="mb-6 flex justify-center sm:mb-8">
          <Link className="flex items-center gap-2 font-semibold" href={"/"}>
            <Image
              src={HydranodeWhiteLogo}
              alt="HydraNode Logo"
              className="h-8 w-auto object-contain sm:h-10"
            />
            <span className="text-2xl sm:text-3xl">HydraNode</span>
          </Link>
        </div>

        <h1 className="transducer-font text-3xl font-medium uppercase leading-none tracking-[-0.01em] sm:text-4xl md:text-[2.5rem]">
          {headline}
        </h1>

        <p className="mt-4 bg-[linear-gradient(174.01deg,rgba(255,223,215,0.7)_25.25%,rgba(255,223,215,0.7)_272.66%)] bg-clip-text font-normal leading-snug tracking-[-0.03em] text-transparent sm:text-[1.350rem] md:mt-5">
          {tagline}
        </p>

        <div className="mt-8 w-full md:mt-10 lg:mt-12">
          <Image
            src={AuthFlash}
            alt="Stylized flash graphic representing speed and technology in certifications"
            className="mx-auto h-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
