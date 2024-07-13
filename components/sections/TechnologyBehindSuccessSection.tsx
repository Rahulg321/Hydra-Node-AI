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
import clsx from "clsx";

const TechnologyBehindSuccessSection = () => {
  return (
    <section className="block-space bg-[#040011] text-white">
      <div className="container">
        <div className="mb-8 space-y-2 text-center md:mb-12">
          <h2 className="text-white">
            The Technology behind your{" "}
            <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <span className="block text-white md:text-lg">
            The cutting-age technology will help you to stay ahead from the rest
            of your competitors.
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <GridContainer heading="User Interface" classname="col-span-3">
            <IconText icon={FaWallet} iconText="Wallet" />
            <IconText icon={FaRocket} iconText="Skills Marketplace" />
            <IconText
              icon={MdOutlineAnalytics}
              iconText="Performance Dashboard"
            />
            <IconText icon={GrAnalytics} iconText="Insights & Analytics" />
          </GridContainer>
          <GridContainer classname="col-span-2" heading="Developer Interface">
            <IconText icon={BsStack} iconText="Developer API" />
            <IconText icon={PiGraphLight} iconText="Blockchain Solutions" />
          </GridContainer>
          <GridContainer heading="Training Model" classname="col-span-2">
            <IconText icon={IoFunnel} iconText="Marketing Strategies" />
            <IconText icon={SiSimpleanalytics} iconText="Financial Analytics" />
            <IconText
              icon={AiFillThunderbolt}
              iconText="Blockchain Verification"
            />
          </GridContainer>
          <GridContainer classname="col-span-3" heading="Personal Model">
            <IconText icon={CiGrid32} iconText="Adaptive Interactions" />
            <IconText icon={TiDocumentAdd} iconText="Data Integration" />
            <IconText icon={BsFillBoxFill} iconText="User Preferences" />
            <IconText icon={GiOpenBook} iconText="Smart Content Delivery" />
          </GridContainer>

          <div className="col-span-5 flex items-center gap-4 rounded-lg border border-[#A5A6F6] p-2">
            <h3 className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              AI Provider
            </h3>
            <div className="flex w-full justify-around">
              <CompanyLogo img={OpenAiLogo} />
              <CompanyLogo img={HuggingFace} />
              <CompanyLogo img={GeminiLogo} />
              <CompanyLogo img={WhiteHydraLogo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyBehindSuccessSection;

function GridContainer({
  heading,
  classname,
  children,
}: {
  classname?: string;
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 rounded-lg border border-[#A5A6F6] p-2",
        classname,
      )}
    >
      <h3 className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
        {heading}
      </h3>
      <div className="flex w-full justify-around">{children}</div>
    </div>
  );
}

function IconText({ icon, iconText }: { icon: IconType; iconText: string }) {
  return (
    <div className="">
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
