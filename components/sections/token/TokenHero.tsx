import Image from "next/image";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import TokenHeroImage from "@/public/token_ hero_full.png";
import TokenHeroContainer from "@/public/TokenHeroContainer.png";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";
import { Button } from "@/components/ui/button";

const TokenHero = () => {
  return (
    <section className="block-space overflow-hidden bg-[#110C1F] md:max-h-[100vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="container text-white">
          <div className="mt-4 flex items-center">
            <FaStar className="mr-2 size-6 text-yellow-400" />
            <span className="text-xl tracking-wide text-[#BEBFFF]">
              The Keystone of Education
            </span>
          </div>
          <h1 className="leading-[1.4]">
            Explore the Future of Education 3.0 with HydraNode Token
          </h1>
          <p className="text-[#F1F1E6]">
            HydraNode token is poised to become the cornerstone of the Education
            3.0 <br /> ecosystem, designed to support educational organizations,
            companies, <br /> lecturers, high-profile executives, and other
            experts whose contributions <br /> are invaluable to our users and
            mission.
          </p>
          <div className="mt-4 space-x-4">
            <Button className="rounded-full bg-base p-6 text-lg font-bold">
              Get Token
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 border-base p-6 text-lg font-bold text-[#5d5fef]"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image src={TokenHeroImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TokenHero;
