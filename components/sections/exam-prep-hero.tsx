import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "../buttons/gradient-button";
import Link from "next/link";

export default function ExamPrepHero() {
  return (
    <div className="block-space w-full">
      <div className="big-container relative flex-col items-center px-4 text-center">
        <h1 className="transducer-font mb-6 bg-gradient-to-r from-white to-transparent bg-clip-text text-center text-[24px] font-medium uppercase leading-[130%] tracking-[-0.04em] text-transparent sm:text-[32px] md:text-[36px] lg:text-[40px]">
          READY TO SUPERCHARGE YOUR EXAM <br className="hidden sm:block" />{" "}
          PREP? GET STARTED WITH AI-
          <br className="hidden sm:block" />
          POWERED PRACTICE TESTS & REAL
          <br className="hidden sm:block" /> EXAM SIMULATIONS!
        </h1>

        <div className="">
          <GradientButton size={"lg"} asChild>
            <Link href="/vendors">Start your Free Exam</Link>
          </GradientButton>
        </div>

        <p className="mt-4 text-sm text-gray-500">No credit card required</p>
      </div>
    </div>
  );
}
