import React from "react";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";
import Bounded from "@/components/Bounded";
import { FaBookOpen } from "react-icons/fa";
import Image from "next/image";
import HeroImage from "@/public/hero-image.png";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="grid max-h-[90vh] grid-cols-1 md:grid-cols-2">
      <div className="container content-center space-y-6">
        <span className="flex items-center text-lg font-bold">
          {" "}
          <FaBookOpen className="mr-2 tracking-wide text-yellow-400" />
          AI-Powered Learning Platform
        </span>
        <h1>
          Boost your Competitive{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Skills
          </span>
          <br /> and Earn
          <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Rewards
          </span>
        </h1>
        <p className="font-semibold leading-loose">
          Unleash your learning potential and elevate your skills effortlessly
          with our AI-driven exam question website and earn amazing rewards
        </p>
        <div className="flex gap-4">
          <Button className="rounded-full bg-base p-6 text-lg font-bold">
            Get a Free Trial
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-2 border-base p-6 text-lg font-bold text-[#5d5fef]"
          >
            Get Rewards
          </Button>
        </div>
      </div>
      <div className="hidden md:block">
        <Image src={HeroImage} alt="Hero Image" />
      </div>
    </section>
  );
};

export default HeroSection;
