/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e8FOZEdMWjs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
const pricingTiers = [
  {
    name: "Free Trial",
    duration: "For 7 days",
    price: 0,
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
}: {
  heading: string;
  content: string;
  trialLimit: string;
  price: string;
  features: string[];
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <span className="text-sm font-semibold">{trialLimit}</span>
        <h4 className="text-baseC">{heading}</h4>
        <span className="text-sm font-semibold text-muted-foreground">
          {content}
        </span>
      </div>
      <div className="my-4">
        <h2 className="text-baseC">${price}</h2>
        <span className="font-bold text-baseC">Whats Included</span>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <FaCheckCircle className="h-6 w-6 basis-1/4 text-base" />{" "}
          <span className="basis-3/4 text-sm">
            for Additional 2% APY* each additional Associate certification
            completed
          </span>
        </div>
        <div>
          {features.map((feature, index) => (
            <div key={index} className="mb-2 flex items-center justify-between">
              <FaCheckCircle className="h-6 w-6 basis-1/4 text-base" />
              <span className="basis-3/4 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <Button className="mt-auto w-full rounded-full bg-base p-6 text-lg font-bold">
          Get Started
        </Button>
      </div>
    </div>
  );
}
