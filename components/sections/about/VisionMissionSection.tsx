import Image from "next/image";
import React from "react";
import MissionImg from "@/public/mission-half.png";
import VisionImg from "@/public/vision-half.png";

const VisionMissionSection = () => {
  return (
    <React.Fragment>
      <section className="container">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="basis-3/4">
            <h2 className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Mission
            </h2>
            <p>
              HydraNode envisions a future where education and professional
              development are democratized, accessible, and rewarding for all.
              We aim to empower a global community of learners and professionals
              to acquire, improve, and share their skills in a collaborative and
              mutually beneficial environment, leveraging the power of AI and
              blockchain technology to create a decentralized skill marketplace
              that fosters innovation, progress, and economic growth.
            </p>
          </div>
          <div className="basis-1/4">
            <Image src={MissionImg} alt="" />
          </div>
        </div>
      </section>
      <section className="block-space">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="basis-1/4">
            <Image src={VisionImg} alt="" />
          </div>
          <div className="container basis-3/4 text-right">
            <h2 className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Vision
            </h2>
            <p>
              HydraNode&apos;s mission is to revolutionize the educational and
              professional development sector by utilizing state-of-the-art AI
              technology integrated with a robust Ethereum blockchain
              infrastructure. Committed to bridge the discrepancy between
              learning and pragmatic application, HydraNode endeavors to provide
              a comprehensive learning ecosystem. This ecosystem aims to open up
              myriad opportunities for students, professionals, and businesses,
              facilitating lifelong learning and contributing significantly to
              the knowledge economy. HydraNode aspires to make education more
              accessible, personalized, and experience oriented, using MoE
              (Mixture of Experts) Architecture and purpose driven, fine tuned
              LLMs (Large Language Model) for an enriched learning journey
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default VisionMissionSection;
