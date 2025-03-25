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
      className="big-container relative flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[rgba(89,38,13,0.9)] to-[rgba(194,65,12,0.9)] p-8 text-center text-white"
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

        <h1 className="transducer-font text-center text-[31.59px] font-medium uppercase leading-[100%] tracking-[-0.01em] sm:text-[33px] md:text-[35px] lg:text-[37px]">
          {headline}
        </h1>

        <p className="mt-6 bg-[linear-gradient(174.01deg,rgba(255,223,215,0.7)_25.25%,rgba(255,223,215,0.7)_272.66%)] bg-clip-text text-center text-[20px] font-normal leading-[140%] tracking-[-0.03em] text-transparent sm:text-[22px]">
          {tagline}
        </p>

        <div className="mt-4 md:mt-6 lg:mt-8">
          <Image src={AuthFlash} alt="auth layout" height={500} width={900} />
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
