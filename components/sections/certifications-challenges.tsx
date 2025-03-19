"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const CertificationsChallenges = () => {
  return (
    <section className="block-space-large bg-mainDark overflow-hidden text-white">
      <div className="container">
        <div className="box mb-6 space-y-4 text-center md:mb-8 lg:mb-16">
          <span className="cursor-blink md:text-lg">What is the problem?</span>
          <h2 className="transducer-font mb-4 text-center text-4xl font-bold tracking-wide md:text-5xl">
            Struggling to Pass Your IT Certifications?
          </h2>
          <span className="text-customMuted block">
            With traditional customer support services, you can face major
            issues like high <br /> operational cost, inconsistent quality, long
            response time and many more.
          </span>
        </div>

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
            <BlankBox classname="flex-1" />
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
    <div className="tech-item rounded-full border border-white p-4">
      <h5>{heading}</h5>
    </div>
  );
}

function BlankBox({ classname }: { classname?: string }) {
  return (
    <div
      className={cn(
        "tech-item hidden rounded-full bg-gradient-to-b from-zinc-900 to-zinc-800 p-4 md:block",
        classname,
      )}
    ></div>
  );
}
