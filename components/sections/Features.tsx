import Image from "next/image";
import { Check, X } from "lucide-react";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";

export default function Features() {
  return (
    <div className="bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="transducer-font mb-4 text-center text-4xl font-bold md:text-5xl">
          WHY CHOOSE US?
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
          A quick comparison of Aligno&apos;s features versus other project
          management tools. See why we stand out.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* HydraNode Column */}
          <div className="-from-[6.68%] -shadow-[0px_-17px_17.8px_0px_rgba(255,255,255,0.04)] relative rounded-lg border bg-opacity-20 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-6 shadow-inner backdrop-blur-[12.309917449951172px]">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-8">
                <Image
                  src={HydranodeWhiteLogo}
                  width={32}
                  height={32}
                  alt="HydraNode logo"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-orange-300">
                HydraNode
              </h3>
            </div>{" "}
            <div className="shadow-inner-[12.897px_1.664px_104.006px_0px_rgba(255,51,0,0.80)] absolute bottom-[34.217px] left-[-25px] h-[111px] w-[212px] bg-[rgba(255,174,0,0.40)] blur-[94.19999694824219px]"></div>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <span>Real-time global collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <span>Fully customizable & scalable</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <span>Advanced sprint management</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <span>Built-in advanced analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <span>User-friendly interface</span>
              </li>
            </ul>
          </div>

          <div className="-from-[6.68%] -shadow-[0px_-17px_17.8px_0px_rgba(255,255,255,0.04)] relative rounded-lg border bg-opacity-20 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.02)] via-[45.63%] to-[rgba(255,255,255,0.08)] to-[103.45%] p-6 shadow-inner backdrop-blur-[12.309917449951172px]">
            <div className="shadow-inner-[12.897px_1.664px_104.006px_0px_rgba(255,51,0,0.80)] absolute bottom-[34.217px] left-[-25px] h-[111px] w-[212px] bg-[rgba(255,174,0,0.40)] blur-[94.19999694824219px]"></div>
            <h3 className="mb-8 text-2xl font-semibold">Other tools</h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <span>Delayed syncing or integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <span>Limited customization</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <span>Lacks dedicated sprint tools</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <span>Requires external add-ons</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                <span>Complicated onboarding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
