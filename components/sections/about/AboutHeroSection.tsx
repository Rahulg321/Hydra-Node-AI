import React from "react";
import AboutHero from "@/public/about_hero.png";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";

const AboutHeroSection = () => {
  return (
    <section className="about-hero-section block-space">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image src={AboutHero} alt="About Hero" />
        </div>
        <div className="container content-center text-right">
          <span className="mb-4 flex items-center justify-end gap-2 text-base text-lg font-semibold leading-loose tracking-wide">
            <BsFillPersonFill className="size-6 text-yellow-400" /> For
            Learners, Professionals & Businesses{" "}
          </span>
          <h1>
            {" "}
            HydraNode is more <br /> than just a{" "}
            <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              platform
            </span>
          </h1>
          <p className="text-[#757095]">
            HydraNode is a comprehensive ecosystem designed to bridge the gap{" "}
            <br />
            between learning and real-world application, offering a unique blend
            of <br />
            learning and application opportunities for students, professionals,
            and businesses alike.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
