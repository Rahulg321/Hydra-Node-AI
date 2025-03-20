"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CheckoutDialog from "@/components/CheckoutDialog";

const PricingCards = () => {
  const session = useSession();
  const router = useRouter();

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
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 99,
      billing: "Billed yearly",
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
      priceId: "price_1PsgMGIbE21KKZM9fg2dyVJ6",
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
    <div className="relative min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="transducer-font mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl"
            >
              CHOOSE THE RIGHT PLAN FOR YOU
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 text-gray-400"
            >
              Simple, Affordable Plans to Fit Your Needs
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg bg-[#121212] bg-gradient-to-b from-[#121212] to-[#121212]/80"
                style={{
                  backgroundImage:
                    index === 1
                      ? "linear-gradient(to bottom, #121212, rgba(232, 113, 33, 0.2))"
                      : "linear-gradient(to bottom, #121212, rgba(18, 18, 18, 0.8))",
                }}
              >
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-300">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-[#e87121]">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && plan.price === 99 && (
                      <span className="ml-1 text-gray-400">/year</span>
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
                      className={`mb-4 w-full rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                        index === 1
                          ? "bg-[#e87121] text-white hover:bg-[#d86010]"
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

                  <p className="mb-6 text-center text-xs text-gray-500">
                    {plan.billing}
                  </p>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <span className="mt-1 text-xs text-[#e87121]">•</span>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mx-auto mt-8 max-w-6xl">
            <div className="rounded-full bg-[#e87121] p-4 text-center text-white">
              If you don&apos;t commit for subscription, you can also buy
              individual exam!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingCards;
