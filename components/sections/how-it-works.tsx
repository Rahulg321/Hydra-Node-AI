import Image from "next/image";
import HowItWorkss from "@/public/illustrations/how-it-works.png";

export default function HowItWorks() {
  return (
    <div className="">
      <div className="big-container block-space">
        <h2 className="transducer-font mb-3 text-center font-bold">
          HOW IT WORKS
        </h2>
        <p className="mb-16 text-center text-gray-400">
          unlock your certification dream in 4 simple steps.
        </p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          {/* Left side - This will be replaced with the provided image */}
          <div className="relative">
            <Image
              src={HowItWorkss}
              alt="How it works flow diagram"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* Step 1 */}
            <div className="relative rounded-3xl border bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-6">
              <h3 className="mb-2 bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text font-semibold leading-none tracking-[-0.567px] text-transparent">
                Sign up for free
              </h3>
              <p className="text-sm leading-relaxed text-white opacity-60">
                Get instant access to our AI-powered exam prep platform by
                signing up in just a few clicks. No credit card required for the
                free trial.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl border bg-opacity-20 p-8">
              <h3 className="mb-2 font-semibold text-white">
                Select any Certification
              </h3>
              <p className="text-sm leading-relaxed text-white opacity-60">
                Our AI dynamically generates exam-style questions based on
                real-time trends and latest study materials to ensure
                you&apos;re practicing the most relevant content.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl border p-8">
              <h3 className="mb-2 font-semibold">Generates Questions</h3>
              <p className="text-sm leading-relaxed text-white opacity-60">
                Experience a real exam interface with time limits, question
                formats, and instant feedback - helping you build confidence and
                reduce test anxiety.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-3xl border p-8">
              <h3 className="mb-2 font-semibold">Start Your Exam</h3>
              <p className="text-sm leading-relaxed text-white opacity-60">
                Get detailed analytics, AI-powered feedback, and personalized
                improvement suggestions to boost your exam readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
