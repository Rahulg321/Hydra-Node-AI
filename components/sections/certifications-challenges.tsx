"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const CertificationsChallenges = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="block-space-large big-container">
        <div className="absolute bottom-0 left-0 z-20 h-3/4 w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="mb-6 space-y-4 text-center md:mb-8 lg:mb-16">
          <h2 className="transducer-font mb-4 text-center text-[36px] font-medium uppercase leading-[45px] tracking-[-0.04em] sm:text-[40px] sm:leading-[50px] md:text-[44px] md:leading-[54px] lg:text-[48px] lg:leading-[58px]">
            Struggling to Pass Your IT Certifications?
          </h2>
          <div className="mx-auto mt-4 max-w-xl">
            <span className="text-[rgba(255, 255, 255, 0.6)] block text-center">
              Traditional certification prep methods often fall short.
              Let&lsquo;s look at why, and how we&lsquo;re solving these
              challenges.
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="Overwhelming content volume" />
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="Outdated materials" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="Test anxiety & performance pressure" />
            <BlankChatBubble classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="Lack of practice" />
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="Generic study content" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="Not aware of your weak areas in study" />
            <BlankChatBubble classname="flex-1" />
          </div>
          <div className="tech-row flex flex-col md:flex-row">
            <ChatBubble heading="Complex explanations" />
            <BlankChatBubble classname="flex-1" />
            <ChatBubble heading="Poor time management during exams" />
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
