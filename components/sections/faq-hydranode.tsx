"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQHydranodeSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems: FAQItem[] = [
    {
      question: "How does the AI-generated practice test work?",
      answer:
        "Our AI dynamically generates questions based on the latest certification exam patterns, ensuring you always study relevant material.",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes, our platform provides detailed analytics and progress tracking. You can see your performance over time, identify weak areas, and track your improvement across different practice tests and topics.",
    },
    {
      question: "What certifications do you support?",
      answer:
        "We support a wide range of IT and professional certifications including AWS, Azure, Google Cloud, CompTIA, Cisco, PMP, and many more. Our library is constantly expanding based on user demand.",
    },
    {
      question: "Can I access the platform on any device?",
      answer:
        "Yes, Hydranode is fully responsive and works on desktops, laptops, tablets, and mobile phones. Your progress syncs across all devices, allowing you to study wherever and whenever you want.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a free trial that gives you full access to our platform features. No credit card is required to start your trial, and you can upgrade to a paid plan at any time.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <div className="bg-black px-4 py-20 text-white">
      <div className="big-container">
        <span className="transducer-font mb-12 block text-center text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
          FREQUENTLY ASKED QUESTIONS
          <br />
          ABOUT HYDRANODE
        </span>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800"
            >
              <div
                className="relative flex cursor-pointer items-center justify-between p-5"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-gray-100">{item.question}</h3>
                <button className="text-gray-400">
                  {openIndex === index ? <X size={20} /> : <Plus size={20} />}
                </button>

                {/* Orange glow effect on the right side */}
                {openIndex === index && (
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent" />
                )}
                {openIndex !== index && (
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-orange-500/10 to-transparent" />
                )}
              </div>

              {openIndex === index && (
                <div className="relative p-5 pt-0 text-gray-400">
                  <p>{item.answer}</p>
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
