import React from "react";
import { FaWallet } from "react-icons/fa";
import OpenAiLogo from "@/public/open_ai_logo.png";
import Image from "next/image";

const TechnologyBehindSuccessSection = () => {
  return (
    <section className="bg-[#040011] text-white block-space">
      <h2 className="text-white">The Technology behind your Success</h2>
      <span>
        The cutting-age technology will help you to stay ahead from the rest of
        your competitors.
      </span>
      <div>
        <div className="border border-[#A5A6F6]">
          <h3>User Interface</h3>
          <IconText />
          <IconText />
          <IconText />
          <IconText />
        </div>
        <div className="border border-[#A5A6F6]">
          <h3>Developer Interface</h3>
          <IconText />
          <IconText />
        </div>
        <div className="border border-[#A5A6F6]">
          <h3>Personal Model</h3>
          <IconText />
          <IconText />
          <IconText />
          <IconText />
          <IconText />
        </div>
        <div className="border border-[#A5A6F6]">
          <h3>Training Model</h3>
          <IconText />
          <IconText />
          <IconText />
        </div>
        <div className="border border-[#A5A6F6]">
          <h3>AI Provider</h3>
          <CompanyLogo />
          <CompanyLogo />
          <CompanyLogo />
          <CompanyLogo />
        </div>
      </div>
    </section>
  );
};

export default TechnologyBehindSuccessSection;

function IconText() {
  return (
    <div>
      <div>
        <FaWallet />
      </div>
      <span>Digital Wallet</span>
    </div>
  );
}
function CompanyLogo() {
  return (
    <div>
      <Image src={OpenAiLogo} alt="Open Ai Logo" />
    </div>
  );
}
