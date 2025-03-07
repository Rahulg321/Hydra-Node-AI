"use client";

import React from "react";
import PricingCards from "./pricing-cards";
import { motion, useInView } from "framer-motion";

export const metadata = {
  title: "Pricing",
  description: "Choose a plan which suits you the best",
};

const PricingPage = () => {
  console.log("inside pricing page");
  const ref = React.useRef(null);
  const inView = useInView(ref, {});

  return (
    <div>
      <PricingCards />

      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's included in the Pro Tier (Lifetime Access)?",
                  a: "Pro Tier (Lifetime Access) includes all current and future features, priority support, and unlimited updates for life. Once you purchase, you'll never have to pay again.",
                },
                {
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade to Lifetime Access, your yearly subscription will be cancelled automatically.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes, by default all the signed-up users will get 7 days free trial, without any credit card requirement.",
                },
                {
                  q: "Can I cancel my yearly plan?",
                  a: "Yes. You can cancel it anytime. You will still have access to our platform until the expiry of your subscription.",
                },
                {
                  q: "Can I buy individual exam?",
                  a: "Yes. Every exam page will show you their individual price. You can buy individual exam and unlock everything for that exam.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-xl bg-white p-6 dark:bg-dark-card"
                >
                  <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
