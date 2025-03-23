import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "../buttons/gradient-button";

export default function ExamPrepHero() {
  return (
    <div className="w-full bg-black py-16 md:py-24 lg:py-32">
      <div className="big-container relative flex-col items-center px-4 text-center">
        <h1
          className="transducer-font mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent"
          style={{
            lineHeight: 1.5,
          }}
        >
          READY TO SUPERCHARGE YOUR EXAM <br /> PREP? GET STARTED WITH AI-
          <br />
          POWERED PRACTICE TESTS & REAL
          <br /> EXAM SIMULATIONS!
        </h1>

        <div className="">
          <GradientButton size={"lg"}>Start your free trial</GradientButton>
        </div>

        <p className="mt-4 text-sm text-gray-500">No credit card required</p>
      </div>
    </div>
  );
}
