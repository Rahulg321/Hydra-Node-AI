"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Zap, Crown, Book } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CheckoutDialog from "@/components/CheckoutDialog";
import { GradientButton } from "@/components/buttons/gradient-button";

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
      icon: Book,
      description: "Start your learning journey",
      duration: "7 days free trial",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 0,
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
      notIncluded: [],
      buttonText: "Get Started",
      subText: "No credit card required",
    },
    {
      name: "Plus",
      icon: Zap,
      description: "Ideal for serious learners",
      duration: "For 1 year",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 99,
      popular: true,
      features: [
        "Everything in Starter",
        "Both practice & mock mode",
        "Entire question bank access",
        "All the vendors access",
      ],
      notIncluded: [],
      buttonText: "Get Started",
      subText: "Billed yearly",
    },
    {
      name: "Lifetime Access",
      icon: Crown,
      description: "Ideal for working professionals",
      duration: "For lifetime",
      mode: "payment",
      priceId: "price_1PsgMGIbE21KKZM9fg2dyVJ6",
      price: 199,
      lifetime: true,
      features: [
        "Everything in Plus",
        "Lifetime updates",
        "Priority feature access",
        "Custom AI model",
      ],
      buttonText: "Get Started",
      subText: "One-time billing",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold uppercase tracking-wider md:text-5xl">
              Choose the right plan for you
            </h1>
            <p className="text-lg text-gray-400">
              Simple, Affordable Plans to Fit Your Needs
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-8"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #111111, #1a1a1a)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <h3 className="mb-6 text-xl font-medium text-gray-300">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-[#f08e67]">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="ml-1 text-gray-400">
                      {plan.lifetime ? "" : "/year"}
                    </span>
                  )}
                </div>
                <p className="mb-6 text-gray-400">{plan.description}</p>

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
                  <div className="space-y-2">
                    <GradientButton
                      className="w-full"
                      size={"lg"}
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      Get Started
                    </GradientButton>
                    <p className="text-center text-sm text-gray-500">
                      {plan.subText}
                    </p>
                  </div>
                )}

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f08e67]" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 opacity-50"
                    >
                      <X className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-auto max-w-3xl"
            >
              <GradientButton size={"lg"} className="w-full">
                If you don&apos;t commit for subscription, you can also buy
                individual exam!
              </GradientButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingCards;
