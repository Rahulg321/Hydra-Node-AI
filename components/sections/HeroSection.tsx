import React from "react";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";
import Bounded from "@/components/Bounded";
import { FaBookOpen } from "react-icons/fa";
import Image from "next/image";
import HeroImage from "@/public/hero-image.png";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="">
        <span className="flex items-center font-bold">
          {" "}
          <FaBookOpen className="text-yellow-400 mr-2" />
          AI-Powered Learning Platform
        </span>
        <h1>
          Boost your Competitive Skills <br /> and Earn Rewards
        </h1>

        <p>
          Unleash your learning potential and elevate your skills effortlessly
          with our AI-driven exam question website and earn amazing rewards
        </p>
        <div className="flex gap-4">
          <ReusbaleButton>Get a Free Trial</ReusbaleButton>
          <ReusbaleButton>Get Rewards</ReusbaleButton>
        </div>
      </div>
      <div>
        <Image src={HeroImage} alt="Hero Image" />
      </div>
    </section>
  );
};

export default HeroSection;
