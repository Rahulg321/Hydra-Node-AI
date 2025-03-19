import Image from "next/image";
import { Check, X } from "lucide-react";

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
          <div className="rounded-lg border border-gray-800 bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-8">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="HydraNode logo"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-orange-300">
                HydraNode
              </h3>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <span>Real-time global collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <span>Fully customizable & scalable</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <span>Advanced sprint management</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <span>Built-in advanced analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <span>User-friendly interface</span>
              </li>
            </ul>
          </div>

          {/* Other Tools Column */}
          <div className="rounded-lg border border-gray-800 bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
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
