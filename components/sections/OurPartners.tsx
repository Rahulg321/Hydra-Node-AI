import Image from "next/image";
import React from "react";
import OpenAiLogo from "@/public/Dark_OpenAI_Logo.png";
import NvidiaLogo from "@/public/NVIDIA_logo.png";
import GoogleCloudLogo from "@/public/Google_Cloud_logo.png";
import EthereumLogo from "@/public/ethereumLogo.png";
import MicrosoftLogo from "@/public/dark_microsoft_logo.png";

const OurPartners = () => {
  return (
    <section className="block-space-large">
      <h3 className="mb-4 text-center text-base">Our Partners</h3>
      <div className="marquee flex w-full flex-col items-center justify-between gap-12 overflow-hidden border-b-2 border-t-2 border-base py-8 md:flex-row">
        <Image src={MicrosoftLogo} alt="" />
        <Image src={OpenAiLogo} alt="" />
        <Image src={EthereumLogo} alt="" />
        <Image src={GoogleCloudLogo} alt="" />
        <Image src={NvidiaLogo} alt="" />
      </div>
    </section>
  );
};

export default OurPartners;
