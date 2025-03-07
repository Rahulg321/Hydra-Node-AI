"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Zap, Users, Crown, Brain, Book } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import CheckoutDialog from "@/components/CheckoutDialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      name: "Starter",
      icon: Book,
      description: "Take a demo",
      duration: "7 days free trial",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 0,
      features: [
        "Acess to all the IT certifications preparation mock exam",
        "AI-Powered question generation",
        "AI-Powered review generation",
        "AI-Powered explanation generation",
        "Only practice mode is available",
        "50 questions per exam",
        "In depth score analysis",
        "Full Exam History",
      ],
      notIncluded: [],
    },
    {
      name: "Plus",
      icon: Zap,
      description: "Ideal for serious learners",
      duration: "For 1 year",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      mode: "subscription",
      price: 100,
      popular: true,
      features: [
        "Everything in Starter",
        "Both practice & mock mode",
        "Entire question bank access",
        "All the vendors access",
      ],
      notIncluded: [],
    },
    {
      name: "Lifetime Billing",
      icon: Crown,
      description: "For lifetime access",
      duration: "For lifetime",
      mode: "payment",
      priceId: "price_1PsgMGIbE21KKZM9fg2dyVJ6",
      price: 200,
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
    <div className="relative min-h-screen pt-12">
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-4xl font-bold md:text-5xl"
            >
              Simple,{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 text-xl text-gray-600 dark:text-gray-400"
            >
              Choose the perfect plan for your learning journey. From individual
              exams to yearly plan or lifetime access.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-dark-card ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                {plan.lifetime && (
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-sm font-medium text-white">
                    Lifetime Access
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.lifetime
                        ? "/one-time"
                        : plan.price === 0
                          ? "/7 days free trial"
                          : "/year"}
                    </span>
                  </div>
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
                      className={`mb-8 w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                        plan.popular || plan.lifetime
                          ? "bg-primary text-white hover:bg-primary-dark"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-dark-lighter dark:hover:bg-dark-card"
                      }`}
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      Get Started
                    </button>
                  )}

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.notIncluded?.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 opacity-50"
                      >
                        <X className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
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
