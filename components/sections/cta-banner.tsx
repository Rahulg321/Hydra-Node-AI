import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <div className="big-container block-space relative overflow-hidden">
      <div className="absolute left-1/2 top-3/4 h-[20rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/0 to-white/10 p-12 text-center">
          {/* Inner glow effect */}
          <div className="absolute bottom-0 left-1/2 h-16 w-1/2 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[50px]"></div>

          <h2 className="transducer-font mb-4 block font-bold tracking-wide">
            YOUR SUCCESS <br />
            STARTS HERE!
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-gray-400">
            Don&apos;t just study – prepare smarter with AI-driven exams &
            insights.
          </p>

          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/20">
            Start your free trial
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
