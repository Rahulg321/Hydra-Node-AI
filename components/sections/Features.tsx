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
            <div className="relative overflow-hidden border bg-opacity-20 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-6">
              <ul className="space-y-6">
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <span>Real-time global collaboration</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <span>Fully customizable & scalable</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <span>Advanced sprint management</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <span>Built-in advanced analytics</span>
                </li>
                <li className="flex items-start gap-3 pb-6">
                  <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <span>User-friendly interface</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute left-1/2 top-3/4 h-[20rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />

            <h3 className="mb-8 text-center text-2xl font-semibold lg:text-3xl">
              Other tools
            </h3>
            <div className="-from-[6.68%] -shadow-[0px_-17px_17.8px_0px_rgba(255,255,255,0.04)] relative border bg-opacity-20 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-6 shadow-inner backdrop-blur-[12.309917449951172px]">
              <ul className="space-y-6">
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                  <span>Delayed syncing or integrations</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                  <span>Limited customization</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                  <span>Lacks dedicated sprint tools</span>
                </li>
                <li className="flex items-start gap-3 border-b border-gray-800 pb-6">
                  <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                  <span>Requires external add-ons</span>
                </li>
                <li className="flex items-start gap-3 pb-6">
                  <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                  <span>Complicated onboarding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
