import Image from "next/image";
import React from "react";
import Professionals from "@/public/professionals.png";
import Learners from "@/public/learners.png";
import Enterprises from "@/public/enterprises.png";

const WhoCanTry = () => {
  return (
    <section className="block-space bg-[#040011] text-white">
      <div className="big-container">
        <div className="mb:6 lg:md-10 text-center md:mb-8">
          <h2>
            Who can{" "}
            <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              try
            </span>
          </h2>
          <p className="text-[#7A7A7A]">
            Unlock the full potential of our platform with our step-by-step
            walkthrough video. Learn how to navigate <br /> seamlessly and make
            the most of our features for an enriched learning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <Image src={Learners} alt="" />
            <h3>Learners</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={Professionals} alt="" />
            <h3>Professionals</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={Enterprises} alt="" />
            <h3>Enterprises</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanTry;
