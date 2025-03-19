import { ArrowRight, Sparkles } from "lucide-react";
import { GradientButton } from "../buttons/gradient-button";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-black py-20 text-white md:py-32">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute left-0 right-0 h-px bg-gray-700"
            style={{ top: `${(i / 12) * 100}%` }}
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute bottom-0 top-0 w-px bg-gray-700"
            style={{ left: `${(i / 12) * 100}%` }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Glowing line */}
        <div className="relative mb-10">
          <div className="mx-auto mb-8 h-0.5 w-64 bg-orange-400 shadow-[0_0_15px_rgba(255,154,102,0.7)]"></div>
        </div>

        {/* Join users text */}
        <div className="mb-8 flex items-center justify-center gap-1 text-gray-300">
          <Sparkles size={16} className="text-orange-400" />
          <span>Join 1000+ users</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-wide md:text-5xl lg:text-6xl">
          ACE YOUR CERTIFICATIONS
          <br />
          WITH{" "}
          <span className="text-gradient bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] text-white">
            AI-POWERED
          </span>{" "}
          PRECISION
        </h1>

        <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-400">
          Experience the future of exam preparation with Hydranode&apos;s
          advanced AI technology. Get realistic practice, instant feedback, and
          personalized learning paths.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center">
          <GradientButton className="" size={"lg"}>
            Start your free trial
          </GradientButton>
          <p className="mt-4 text-sm text-gray-500">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
