import Image from "next/image";
import React from "react";
import Professionals from "@/public/professionals.png";
import Learners from "@/public/learners.png";
import Enterprises from "@/public/enterprises.png";

const WhoCanTry = () => {
  return (
    <section className="block-space bg-[#040011] text-white">
      <div className="big-container">
        <h2>Who can try HydraNode</h2>
        <span>
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate seamlessly and make the most
          of our features for an enriched learning experience.
        </span>
        <div className="grid grid-cols-3">
          <div>
            <Image src={Learners} alt="" />
            <h3>Learners</h3>
          </div>
          <div>
            <Image src={Professionals} alt="" />
            <h3>Professionals</h3>
          </div>
          <div>
            <Image src={Enterprises} alt="" />
            <h3>Enterprises</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanTry;
