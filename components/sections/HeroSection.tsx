"use client";

import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Lamp from "../ui/lamp";

export default function CertificationHero() {
  return (
    <div className="relative flex min-h-[550px] w-full flex-col items-center justify-center overflow-hidden text-white">
      <Lamp />
      <div className="absolute bottom-[-12rem] left-1/2 h-[20rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />

      <div className="absolute inset-0 z-[-10]">
        {/* Horizontal lines */}
        <div className="absolute inset-x-0 top-[20%] h-[0.56px] w-full opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="absolute inset-x-0 bottom-[20%] h-[0.56px] w-full opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />

        {/* Vertical lines */}
        <div className="absolute left-[20%] top-0 h-full w-[0.56px] opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="absolute right-[30%] top-0 h-full w-[0.56px] opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        {/* Vertical lines */}
        <div className="absolute left-[30%] top-0 h-full w-[0.56px] opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="absolute right-[10%] top-0 h-full w-[0.56px] opacity-20 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />

        {/* Dots at intersections */}
        <div className="absolute left-[30%] top-[20%] -translate-x-1/2 -translate-y-1/2">
          <span className="block h-2 w-2 rounded-full bg-white opacity-80" />
        </div>
        <div className="absolute right-[30%] top-[20%] -translate-y-1/2 translate-x-1/2">
          <span className="block h-2 w-2 rounded-full bg-white opacity-80" />
        </div>
        <div className="absolute bottom-[20%] left-[30%] -translate-x-1/2 translate-y-1/2">
          <span className="block h-2 w-2 rounded-full bg-white opacity-80" />
        </div>
        <div className="absolute bottom-[20%] right-[30%] translate-x-1/2 translate-y-1/2">
          <span className="block h-2 w-2 rounded-full bg-white opacity-80" />
        </div>
      </div>
      {/* Join users text */}
      <div className="mb-8 flex items-center gap-1.5 text-sm">
        <Plus className="h-4 w-4" />
        <span className="text-xs md:text-lg">Join 1000+ users</span>
      </div>
      {/* Main heading */}

      <h1 className="transducer-font mb-6 px-4 text-center font-bold leading-tight tracking-wide">
        ACE YOUR CERTIFICATIONS
        <br />
        WITH{" "}
        <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text font-bold leading-none tracking-[-0.567px] text-transparent">
          AI-POWERED
        </span>{" "}
        PRECISION
      </h1>

      {/* Subtext */}
      <p className="mb-10 max-w-2xl bg-[linear-gradient(174.01deg,_rgba(255,223,215,0.7)_25.25%,_rgba(255,223,215,0.7)_272.66%)] bg-clip-text px-6 text-center text-lg text-transparent md:text-xl">
        Experience the future of exam preparation with Hydranode&apos;s advanced
        AI technology. Get realistic practice, instant feedback, and
        personalized learning paths.
      </p>

      <Link
        href="/vendors"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a50] to-[#ff9d7a] px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
      >
        Start your journey
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* No credit card text */}
      <p className="mt-4 text-sm text-gray-500">No credit card required</p>
    </div>
  );
}
