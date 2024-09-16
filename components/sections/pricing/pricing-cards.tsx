/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e8FOZEdMWjs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import CheckoutDialog from "@/components/CheckoutDialog";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { Session } from "next-auth";
import Link from "next/link";

export type PricingTier = {
  name: string;
  duration: string;
  price: number;
  priceId: string;
  isFeatured: boolean;
  description: string;
  features: string[];
  mode: "subscription" | "payment";
  trialPeriodDays?: number;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Free Trial",
    duration: "For 7 days",
    priceId: "price_1PsgJhIbE21KKZM9euPNiOY9",
    price: 0,
    trialPeriodDays: 7,
    isFeatured: false,
    mode: "subscription",
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
    priceId: "price_1PrzWhIbE21KKZM9Ji68Xdwn",
    mode: "subscription",
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
    mode: "subscription",
    isFeatured: true,
    priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
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
    mode: "payment",
    priceId: "price_1PsgMGIbE21KKZM9fg2dyVJ6",
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

export default async function PricingCardSection() {
  const session = await auth();
  return (
    <section className="block-space-mini container w-full">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        {pricingTiers.map((tier, index) => (
          <PricingCard key={index} product={tier} session={session} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({
  product,
  session,
}: {
  product: PricingTier;
  session: Session | null;
}) {
  const {
    name: heading,
    duration: content,
    price,
    isFeatured,
    features,
  } = product;

  return (
    <Card
      className={clsx("rounded-lg border border-gray-200", {
        "bg-[#5d5fef]": product.isFeatured === true,
      })}
    >
      {product.isFeatured === true && (
        <div className="relative top-[-20px] mx-auto w-fit rounded-full bg-[#A5A6F6] px-4 py-2 text-white">
          <span>Most Popular</span>
        </div>
      )}
      <CardHeader>
        <div>
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
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <h2
            className={clsx("text-baseC", {
              "text-white": isFeatured === true,
            })}
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
                className={clsx("basis-1/5 text-base", {
                  "text-white": isFeatured === true,
                })}
              />
              <span
                className={clsx("basis-4/5 text-sm", {
                  "text-white": isFeatured === true,
                })}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {session ? (
          <CheckoutDialog product={product} session={session} />
        ) : (
          <Button className="w-full" asChild>
            <Link href={"/login"}>Buy Now</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
