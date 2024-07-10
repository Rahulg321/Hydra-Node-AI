import React from "react";
import { FaWallet } from "react-icons/fa";
import OpenAiLogo from "@/public/open_ai_logo.png";
import HuggingFace from "@/public/hugging_face_logo.png";
import GeminiLogo from "@/public/gemini_logo.png";
import WhiteHydraLogo from "@/public/white_hyra_logo.png";
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";
import { FaRocket } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { BsStack } from "react-icons/bs";
import { PiGraphLight } from "react-icons/pi";
import { CiGrid32 } from "react-icons/ci";
import { TiDocumentAdd } from "react-icons/ti";
import { BsFillBoxFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { GiOpenBook } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { AiFillThunderbolt } from "react-icons/ai";

const TechnologyBehindSuccessSection = () => {
  return (
    <section className="bg-[#040011] text-white block-space">
      <h2 className="text-white">The Technology behind your Success</h2>
      <span>
        The cutting-age technology will help you to stay ahead from the rest of
        your competitors.
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
        <div className="border border-[#A5A6F6] col-span-3">
          <h3>User Interface</h3>
          <div className="flex gap-4">
            <IconText icon={FaWallet} iconText="Wallet" />
            <IconText icon={FaRocket} iconText="Skills Marketplace" />
            <IconText
              icon={MdOutlineAnalytics}
              iconText="Performance Dashboard"
            />
            <IconText icon={GrAnalytics} iconText="Insights & Analytics" />
          </div>
        </div>
        <div className="border border-[#A5A6F6] col-span-2">
          <h3>Developer Interface</h3>
          <div className="flex gap-4">
            <IconText icon={BsStack} iconText="Developer API" />
            <IconText icon={PiGraphLight} iconText="Blockchain Solutions" />
          </div>
        </div>
        <div className="border border-[#A5A6F6] col-span-3">
          <h3>Personal Model</h3>
          <div className="flex gap-4">
            <IconText icon={CiGrid32} iconText="Adaptive Interactions" />
            <IconText icon={TiDocumentAdd} iconText="Data Integration" />
            <IconText icon={BsFillBoxFill} iconText="User Preferences" />
            <IconText
              icon={HiPencilAlt}
              iconText="Customized Learning Pathways"
            />
            <IconText icon={GiOpenBook} iconText="Smart Content Delivery" />
          </div>
        </div>
        <div className="border border-[#A5A6F6] col-span-2">
          <h3>Training Model</h3>
          <div className="flex gap-4">
            <IconText icon={IoFunnel} iconText="Marketing Strategies" />
            <IconText icon={SiSimpleanalytics} iconText="Financial Analytics" />
            <IconText
              icon={AiFillThunderbolt}
              iconText="Blockchain Verification"
            />
          </div>
        </div>
        <div className="border border-[#A5A6F6] col-span-5">
          <h3>AI Provider</h3>
          <div className="flex gap-4">
            <CompanyLogo img={OpenAiLogo} />
            <CompanyLogo img={HuggingFace} />
            <CompanyLogo img={GeminiLogo} />
            <CompanyLogo img={WhiteHydraLogo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyBehindSuccessSection;

function IconText({ icon, iconText }: { icon: IconType; iconText: string }) {
  return (
    <div>
      <div className="text-2xl">{React.createElement(icon)}</div>
      <span className="text-xs">{iconText}</span>
    </div>
  );
}
function CompanyLogo({ img }: { img: StaticImageData }) {
  return (
    <div>
      <Image src={img} alt="Open Ai Logo" />
    </div>
  );
}
