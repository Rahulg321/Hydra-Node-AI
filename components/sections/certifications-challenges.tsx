"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const CertificationsChallenges = () => {
  return (
    <section className="block-space-large big-container bg-mainDark overflow-hidden text-white">
      <div className="relative">
        <div className="box mb-6 space-y-4 text-center md:mb-8 lg:mb-16">
          <h2 className="transducer-font mb-4 text-center text-[36px] font-medium uppercase leading-[45px] tracking-[-0.04em] sm:text-[40px] sm:leading-[50px] md:text-[44px] md:leading-[54px] lg:text-[48px] lg:leading-[58px]">
            Struggling to Pass Your IT Certifications?
          </h2>
          <span className="block bg-clip-text text-center text-gray-400">
            With traditional customer support services, you can face major
            issues like high <br /> operational cost, inconsistent quality, long
            response time and many more.
          </span>
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-3/4 w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="space-y-4">
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="How to handle massive Customer Support?" />
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="How can I elevate User Experience?" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="How can I save service cost?" />
            <BlankChatBubble classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="How to save my valuable time from hiring process?" />
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="How can I attract more customers?" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="How can I increase engagement on my website?" />
            <BlankChatBubble classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="How to serve quick results?" />
            <div className="flex-1"></div>
            <ChatBubble heading="How can I automate the communication?" />
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

export interface ChatBubbleProps {
  heading: string;
  isSender?: boolean;
  className?: string;
}

export function ChatBubble({ heading, className }: ChatBubbleProps) {
  return (
    <div className={cn("flex", className)}>
      <div
        className={cn(
          "bg-neutral-850 inline-flex gap-2.5 rounded-t-3xl rounded-bl-md rounded-br-3xl px-6 py-3.5 outline outline-2 outline-offset-[-1px] outline-neutral-800",
        )}
      >
        <div className="justify-start text-center font-medium text-white">
          {heading}
        </div>
      </div>
    </div>
  );
}

export function BlankChatBubble({ classname }: { classname: string }) {
  return (
    <div className={cn("", classname)}>
      <div
        className={cn(
          "tech-item hidden h-14 rounded-full bg-neutral-800 p-4 px-6 py-3.5 md:block",
        )}
      ></div>
    </div>
  );
}
