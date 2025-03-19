import Image from "next/image";
import React from "react";

const AuthHeroSection = () => {
  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-8 text-center text-white md:p-12"
      style={{}}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 max-w-xl">
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M2 12h5"></path>
              <path d="M2 12a10 10 0 0 1 20 0"></path>
              <path d="M2 12a10 10 0 0 0 20 0"></path>
              <path d="M22 12h-5"></path>
              <path d="M18 12v.5"></path>
              <path d="M18 16v.5"></path>
              <path d="M18 8v.5"></path>
              <path d="M6 12v.5"></path>
              <path d="M6 16v.5"></path>
              <path d="M6 8v.5"></path>
              <path d="M10 8v.5"></path>
              <path d="M14 8v.5"></path>
              <path d="M10 16v.5"></path>
              <path d="M14 16v.5"></path>
              <path d="M18 12a6 6 0 0 0-12 0"></path>
            </svg>
            HydraNode
          </div>
        </div>

        <h1 className="transducer-font hsl-white mb-6 font-sans text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl">
          WELCOME TO HYDRANODE
        </h1>

        <p className="mb-12 text-gray-200">
          Experience the future of exam preparation with Hydranode&apos;s
          advanced AI technology. Get realistic practice, instant feedback, and
          personalized learning paths.
        </p>

        <Image
          src={"/auth/auth-hero12.png"}
          width={600}
          height={600}
          alt="auth layout"
        />
      </div>
    </div>
  );
};

export default AuthHeroSection;
