import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <div className="bg-black px-4 py-20 text-white">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="transducer-font mb-12 text-3xl font-bold leading-tight tracking-wide md:text-4xl lg:text-5xl">
          <span className="text-gray-200">READY TO SUPERCHARGE </span>
          <span className="text-gray-300">YOUR EXAM</span>
          <br />
          <span className="text-gray-300">PREP? GET STARTED </span>
          <span className="text-gray-400">WITH AI-</span>
          <br />
          <span className="text-gray-400">POWERED PRACTICE TESTS </span>
          <span className="text-gray-500">& REAL</span>
          <br />
          <span className="text-gray-500">EXAM SIMULATIONS!</span>
        </h2>

        <div className="flex flex-col items-center">
          <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/20">
            Star your free trial
            <ArrowRight size={18} />
          </button>
          <p className="mt-4 text-sm text-gray-500">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
