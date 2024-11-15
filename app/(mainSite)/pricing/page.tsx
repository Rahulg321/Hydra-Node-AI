"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Zap, Users, Crown, Brain } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const PricingPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Starter",
      icon: Brain,
      description: "Perfect for individual learners",
      priceId: "price_1PrzX8IbE21KKZM9E5iroLPx",
      price: 100,
      features: [
        "Access to basic courses",
        "AI-powered study plans",
        "Practice tests",
        "Basic analytics",
        "Email support",
        "Mobile app access",
      ],
      notIncluded: [
        "Advanced AI features",
        "Mentorship sessions",
        "Custom learning paths",
        "Team collaboration",
        "API access",
      ],
    },
    {
      name: "Professional",
      icon: Zap,
      description: "Ideal for serious learners",
      priceId: "price_1PsgMGIbE21KKZM9fg2dyVJ6",
      price: 200,
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced AI features",
        "Personalized feedback",
        "Priority support",
        "Advanced analytics",
        "Custom learning paths",
        "Certification prep",
        "Unlimited practice tests",
      ],
      notIncluded: ["Team collaboration", "API access"],
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For teams and organizations",
      price: 999,
      lifetime: true,
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom integrations",
        "API access",
        "Dedicated support",
        "Custom reporting",
        "SSO integration",
        "Volume licensing",
        "Custom contracts",
        "Lifetime updates",
        "Priority feature access",
        "Custom AI model training",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      <ParticleBackground />

      {/* Header Section */}
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
              learners to enterprise teams.
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
                className={`dark:bg-dark-card relative overflow-hidden rounded-2xl bg-white shadow-xl ${
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
                      {plan.lifetime ? " one-time" : "/month"}
                    </span>
                  </div>
                  <button
                    className={`mb-8 w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                      plan.popular || plan.lifetime
                        ? "hover:bg-primary-dark bg-primary text-white"
                        : "dark:bg-dark-lighter dark:hover:bg-dark-card bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </button>

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

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's included in the Lifetime Access?",
                  a: "Lifetime Access includes all current and future features, priority support, and unlimited updates for life. Once you purchase, you'll never have to pay again.",
                },
                {
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade to Lifetime Access, your monthly subscription will be cancelled automatically.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes, all plans come with a 14-day free trial. No credit card required.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="dark:bg-dark-card rounded-xl bg-white p-6"
                >
                  <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default PricingPage;
