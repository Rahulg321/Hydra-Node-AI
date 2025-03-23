"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const CertificationsChallenges = () => {
  return (
    <section className="block-space-large big-container bg-mainDark overflow-hidden text-white">
      <div className="relative">
        <div className="box mb-6 space-y-4 text-center md:mb-8 lg:mb-16">
          <span className="cursor-blink md:text-lg">What is the problem?</span>
          <h2 className="transducer-font mb-4 text-center font-bold tracking-wide">
            Struggling to Pass Your IT Certifications?
          </h2>
          <span className="block text-gray-400">
            With traditional customer support services, you can face major
            issues like high <br /> operational cost, inconsistent quality, long
            response time and many more.
          </span>
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-3/4 w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="space-y-4">
          <div className="tech-row flex flex-col md:flex-row">
            <TextBox heading="How to handle massive Customer Support?" />
            <BlankBox classname="flex-1" />
            <TextBox heading="How can I elevate User Experience?" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankBox classname="flex-1" />
            <TextBox heading="How can I save service cost?" />
            <BlankBox classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <TextBox heading="How to save my valuable time from hiring process?" />
            <BlankBox classname="flex-1" />
            <TextBox heading="How can I attract more customers?" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankBox classname="flex-1" />
            <TextBox heading="How can I increase engagement on my website?" />
            <BlankBox classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <TextBox heading="How to serve quick results?" />
            <div className="flex-1"></div>
            <TextBox heading="How can I automate the communication?" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsChallenges;

function TextBox({ heading }: { heading: string }) {
  return (
    <div className="inline-flex h-14 items-center justify-start gap-2.5 rounded-bl-[5px] rounded-br-3xl rounded-tl-3xl rounded-tr-3xl bg-neutral-950 px-6 py-3.5 outline outline-1 outline-offset-[-1px] outline-neutral-800">
      <div className="justify-start text-center font-medium text-white">
        {heading}
      </div>
    </div>
  );
}

function BlankBox({ classname }: { classname?: string }) {
  return (
    <div
      className={cn(
        "tech-item hidden rounded-full bg-neutral-900 p-4 md:block",
        classname,
      )}
    ></div>
  );
}
