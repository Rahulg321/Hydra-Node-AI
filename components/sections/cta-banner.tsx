import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <div className="relative overflow-hidden bg-black px-4 py-16 text-white">
      {/* Orange glow effect at the bottom */}
      <div className="absolute bottom-0 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full bg-orange-500/30 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-12 text-center">
          {/* Inner glow effect */}
          <div className="absolute bottom-0 left-1/2 h-16 w-1/2 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[50px]"></div>

          <span className="transducer-font mb-4 block text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
            YOUR SUCCESS
            <br />
            STARTS HERE!
          </span>

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
