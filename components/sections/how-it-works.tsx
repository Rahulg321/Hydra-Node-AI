import Image from "next/image";
import HowItWorkss from "@/public/illustrations/how-it-works.png";

export default function HowItWorks() {
  return (
    <div className="bg-black px-4 py-16 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="transducer-font mb-3 text-center text-4xl font-bold md:text-5xl">
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
              className="mx-auto"
            />
          </div>

          {/* Right side - Text boxes */}
          <div className="flex flex-col gap-6">
            {/* Step 1 */}
            <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur">
              <h3 className="mb-2 text-2xl font-semibold text-orange-400">
                Sign up for free
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Get instant access to our AI-powered exam prep platform by
                signing up in just a few clicks. No credit card required for the
                free trial.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur">
              <h3 className="mb-2 text-2xl font-semibold text-white">
                Select any Certification
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Our AI dynamically generates exam-style questions based on
                real-time trends and latest study materials to ensure
                you&apos;re practicing the most relevant content.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur">
              <h3 className="mb-2 text-2xl font-semibold text-white">
                Generates Questions
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Experience a real exam interface with time limits, question
                formats, and instant feedback - helping you build confidence and
                reduce test anxiety.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur">
              <h3 className="mb-2 text-2xl font-semibold text-white">
                Start Your Exam
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
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
