import Image from "next/image";
import { Check, X } from "lucide-react";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";

export default function Features() {
  return (
    <div className="bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="transducer-font mb-4 text-center text-[32px] font-medium uppercase leading-[100%] tracking-[-0.04em] sm:text-[40px] md:text-[44px] lg:text-[48px]">
          WHY CHOOSE US{" "}
          <span className="text-xl md:text-2xl lg:text-4xl">?</span>
        </h2>

        <p className="mx-auto mb-16 max-w-xl text-center text-white opacity-60 lg:text-lg">
          A quick comparison of Aligno&apos;s features versus other project
          management tools. See why we stand out.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute left-4 top-1/2 h-[20rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />

            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="h-8 w-8">
                <Image
                  src={HydranodeWhiteLogo}
                  width={50}
                  height={50}
                  alt="HydraNode logo"
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-orange-300 lg:text-3xl">
                HydraNode
              </h3>
            </div>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-8">
              <ul className="space-y-6">
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Questions are dynamically created and updated by AI to
                    perfectly match the latest exam syllabus
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    A single, low cost subscription gives you access to our
                    entire library of certification exams.
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Our platform analyses your performance and creates a study
                    plan focusing on your specific knowledge gaps to ensure you
                    learn efficiently
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    The AI continously monitors for syllabus changes from
                    vendors like Google, Microsoft and AWS
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Experience a different, realistic practice exam everytime.
                    Our AI mimics the actual testing environment to build true
                    confidence.
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Get instant, detailed feedback on your performance, tracking
                    your progress where you need to improve
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute left-1/2 top-3/4 h-[20rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />

            <h3 className="mb-8 text-center text-2xl font-semibold lg:text-3xl">
              Other tools
            </h3>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-8">
              <ul className="space-y-10 md:space-y-11">
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Relies on a fixed pool of manually uploaded questions that
                    are often outdated, irrelevant or inaccurate.
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Charges high fees (often $50+) for each individual exam dump
                    you need
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Encourages simply memorizing answers without understanding
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Content can be months or even years out of date
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    You can see the same limited set of questions over and over,
                    leading to false confidence from memorization, not mastery
                  </span>
                </li>
                <li className="flex items-start gap-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                  <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span className="text-sm leading-relaxed text-white opacity-80">
                    Provides a simple pass/fail score with no deep insights into
                    your actual strengths and weaknesses
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
