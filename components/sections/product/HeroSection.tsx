import Link from "next/link";
import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";

const HeroSection = () => {
  return (
    <section className="block-space-large big-container">
      <div>
        <div className="mb-12 text-center">
          <h1 className="mb-2 md:mb-4">
            Select your Exam{" "}
            <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Type
            </span>
          </h1>
          <span className="block text-mutedText">
            Choose between a Practice Exam to hone your skills or a Mock Exam
            for a simulated <br /> test experience. Tailor your preparation to
            suit your needs
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Link href={"/vendors"} className="rounded-lg bg-base p-6 lg:p-12">
            <div className="mb-4 text-4xl text-white lg:text-6xl">
              <IoDocumentText />
            </div>
            <h3 className="mb-4 text-white">Practice Exam</h3>
            <span className="text-white">
              Customize your Practice Exam: unlimited questions, no timer.{" "}
              <br />
              Tailor your learning, stress-free
            </span>
          </Link>
          <Link href={"*"} className="rounded-lg bg-[#5D5FEF29] p-6 lg:p-12">
            <div className="mb-4 text-4xl text-white lg:text-6xl">
              <RxLapTimer />
            </div>
            <h3 className="mb-4 text-mutedText">Mock Exam</h3>
            <span className="text-mutedText">
              Mock Exam: Timed sessions, mirror real conditions. Set timer for
              authentic prep
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
