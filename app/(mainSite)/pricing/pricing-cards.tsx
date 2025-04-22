"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckoutDialog from "@/components/CheckoutDialog";
import { GradientButton } from "@/components/buttons/gradient-button";
import { Switch } from "@/components/ui/switch";

const PricingCards = () => {
  const session = useSession();
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">(
    "yearly",
  );

  const userId = session.data?.user.id;
  const userEmail = session.data?.user.email;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "7 days Free Trial",
      description: "Start your learning journey",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 0,
      billing: "No credit card required",
      features: [
        "Access to all the IT certifications preparation mock exam",
        "AI-Powered question generation",
        "AI-Powered review generation",
        "AI-Powered explanation generation",
        "Only practice mode is available",
        "50 questions per exam",
        "In depth score analysis",
        "Full Exam History",
      ],
    },
    {
      name: "Plus",
      description: "Ideal for serious learners",
      priceId:
        billingPeriod === "yearly"
          ? "price_1RGe7PIbE21KKZM94OWnAMWS"
          : "price_1RGe2CIbE21KKZM9LvUkDVpj",
      mode: "subscription",
      price: billingPeriod === "yearly" ? 149 : 15,
      billing: `Billed ${billingPeriod}`,
      popular: true,
      features: [
        "Everything in Starter",
        "Both practice & mock mode",
        "Entire question bank access",
        "All the vendors access",
      ],
    },
    {
      name: "Lifetime Access",
      description: "Ideal for working professionals",
      priceId: "price_1RGe9KIbE21KKZM9HQ3YUphb",
      mode: "payment",
      price: 199,
      billing: "One-time billing",
      lifetime: true,
      features: [
        "Everything in Plus",
        "Lifetime updates",
        "Priority feature access",
        "Custom AI model",
      ],
    },
  ];

  return (
    <div className="">
      <section className="py-16">
        <div className="big-container mx-auto px-4">
          <div className="text-center">
            <h2 className="transducer-font mb-4 font-bold uppercase tracking-wider">
              CHOOSE THE RIGHT PLAN FOR YOU
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 text-gray-400"
            >
              Simple, Affordable Plans to Fit Your Needs
            </motion.p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-y-auto overflow-x-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(112.86deg,rgba(255,255,255,0.08)_-6.68%,rgba(255,255,255,0.024)_45.63%,rgba(255,255,255,0.08)_103.45%)]"
              >
                {
                  <div className="absolute left-[-1/2] top-3/4 h-[10rem] w-64 -translate-x-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />
                }
                {index === 1 && billingPeriod === "yearly" && (
                  <div className="absolute left-0 right-0 mb-4 flex justify-center">
                    <div className="rounded-full bg-[#3A3A3A] px-6 py-2 text-center">
                      <p className="caveat-font text-white">
                        Get 2 months for free on annual billing
                      </p>
                    </div>
                  </div>
                )}
                <div className="p-8 pt-12">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-300">
                        {plan.name}
                      </h3>
                      {index === 1 && (
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${billingPeriod === "monthly" ? "text-white" : "text-gray-400"}`}
                          >
                            Monthly
                          </span>
                          <Switch
                            checked={billingPeriod === "yearly"}
                            onCheckedChange={(checked) =>
                              setBillingPeriod(checked ? "yearly" : "monthly")
                            }
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[rgba(255,195,177,0.9)] data-[state=checked]:to-[rgba(255,98,24,0.9)]"
                          />
                          <span
                            className={`text-sm ${billingPeriod === "yearly" ? "text-white" : "text-gray-400"}`}
                          >
                            Yearly
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text text-5xl text-[56.69px] font-bold leading-none tracking-[-0.567px] text-transparent">
                      $
                      {typeof plan.price === "number"
                        ? plan.price.toFixed(plan.price % 1 === 0 ? 0 : 2)
                        : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="ml-1 text-gray-400">
                        {index === 1
                          ? billingPeriod === "yearly"
                            ? "/year"
                            : "/month"
                          : ""}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-gray-400">
                    {plan.description}
                  </p>

                  {session.data && plan.price !== 0 ? (
                    <CheckoutDialog
                      priceId={plan.priceId}
                      mode={plan.mode}
                      popular={plan.popular}
                      lifetime={plan.lifetime}
                      name={plan.name}
                      userId={userId as string}
                      email={userEmail as string}
                    />
                  ) : (
                    <button
                      className={`mb-4 block w-full rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                        index === 1
                          ? "bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] text-white hover:opacity-90"
                          : "bg-[#1e1e1e] text-white hover:bg-[#2a2a2a]"
                      }`}
                      onClick={() => {
                        if (!session.data) {
                          router.push("/login");
                        }
                      }}
                    >
                      Get Started
                    </button>
                  )}

                  <p className="mb-6 text-center text-sm text-gray-500">
                    {plan.billing}
                  </p>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <span className="mt-1 text-sm text-white">•</span>
                        <span className="text-sm text-white opacity-60">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingCards;
