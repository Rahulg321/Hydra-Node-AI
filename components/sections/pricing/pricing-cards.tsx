/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e8FOZEdMWjs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const pricingTiers = [
  {
    name: "Free Trial",
    duration: "For 7 days",
    price: 0,
    isFeatured: false,
    description:
      "Get a quick overview of our platform through the free trial and explore the potential of HydraNode.",
    features: [
      "Limited study materials access",
      "Participation in basic contests",
      "Limited personalized learning",
      "Access to a community forum",
    ],
  },
  {
    name: "Quarterly Billing",
    duration: "For 3 months",
    isFeatured: false,
    price: 50,
    description:
      "Ideal for those who prefer short-term commitments with comprehensive features.",
    features: [
      "Full access to all study materials",
      "Participation in all contests",
      "Full use of personalized learning",
      "Monthly prog. report & feedback",
      "Base APY* of 10% for staking HydraNode tokens",
      "for Additional 2% APY* each additional Associate certification completed",
      "Access to exclusive webinars and workshops",
    ],
  },
  {
    name: "Yearly Billing",
    duration: "For 1 year",
    isFeatured: true,
    price: 100,
    description:
      "Perfect for committed learners and professionals aiming for continuous growth and development.",
    features: [
      "All features from Quarterly plan",
      "Access to professional certification programs reward",
      "Base APY* of 20% for staking HydraNode tokens",
      "Additional 3% APY* for each additional Professional Certification completed",
      "Priority support",
      "Early access to new features and beta programs",
      "Opportunities for early-stage EdTech investment",
    ],
  },
  {
    name: "Lifetime Billing",
    duration: "For lifetime",
    price: 200,
    isFeatured: false,
    description:
      "Gain unlimited access to HydraNode's platform and resources for life.",
    features: [
      "All features from the Yearly plan",
      "Access to professional certification programs (Specialist level)",
      "Base APY* of 30% for staking HydraNode tokens",
      "Additional 4% APY* for each additional Specialist certification completed",
      "Lifetime access to all updates and new content",
      "Participation in exclusive collaboration projects and partnerships",
      "Higher staking rewards and revenue sharing from the HydraNode marketplace",
      "Exclusive access to invest in promising educational technology startups and GameFi opportunities",
    ],
  },
];

export default function PricingCardSection() {
  return (
    <section className="block-space-mini container w-full">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        {pricingTiers.map((tier, index) => (
          <PricingCard
            key={index}
            heading={tier.name}
            content={tier.description}
            trialLimit={tier.duration}
            price={tier.price.toString()}
            features={tier.features}
            isFeatured={tier.isFeatured}
          />
        ))}
      </div>
    </section>
  );
}

function PricingCard({
  heading,
  content,
  trialLimit,
  price,
  features,
  isFeatured,
}: {
  heading: string;
  content: string;
  trialLimit: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
}) {
  return (
    <div
      className={clsx("rounded-lg border border-gray-200 p-4", {
        "bg-[#5d5fef]": isFeatured === true,
      })}
    >
      {isFeatured === true && (
        <div className="relative top-[-40px] mx-auto w-fit rounded-full bg-[#A5A6F6] px-4 py-2 text-white">
          <span>Most Popular</span>
        </div>
      )}
      <div>
        <span
          className={clsx("text-sm font-semibold", {
            "text-white": isFeatured === true,
          })}
        >
          {trialLimit}
        </span>
        <h4
          className={clsx("text-lg font-bold", {
            "text-white": isFeatured === true,
          })}
        >
          {heading}
        </h4>
        <span
          className={clsx("text-sm font-semibold", {
            "text-white": isFeatured === true,
          })}
        >
          {content}
        </span>
      </div>
      <div className="my-4">
        <h2
          className={clsx("text-baseC", { "text-white": isFeatured === true })}
        >
          ${price}
        </h2>
        <span
          className={clsx("font-bold text-baseC", {
            "text-white": isFeatured === true,
          })}
        >
          Whats Included
        </span>
      </div>

      <div>
        {features.map((feature, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <FaCheckCircle
              className={clsx("h-6 w-6 basis-1/4 text-base", {
                "text-white": isFeatured === true,
              })}
            />
            <span
              className={clsx("basis-3/4 text-sm", {
                "text-white": isFeatured === true,
              })}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Button
        className={clsx(
          "mt-auto w-full rounded-full bg-base p-6 text-lg font-bold",
          {
            "bg-white text-baseC": isFeatured === true,
          },
        )}
      >
        Get Started
      </Button>
    </div>
  );
}
