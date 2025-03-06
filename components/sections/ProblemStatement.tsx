"use client";

import React, { useState } from "react";
import {
  BookOpenCheck,
  TimerReset,
  BrainCircuit,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  problems: string[];
  image: string;
  className?: string;
}

const ProblemCard = ({
  icon,
  title,
  problems,
  image,
  className,
}: ProblemCardProps) => {
  return (
    <motion.div
      className={`overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-lg shadow-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 dark:border-purple-500/20 dark:bg-[#1a1333]/80 dark:shadow-purple-900/10 dark:hover:border-purple-500/40 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative h-full p-6">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 dark:bg-[linear-gradient(to_right,rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.1)_1px,transparent_1px)]"></div>

        {/* Glowing orb effect */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-500"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full">
          {/* Left side - Text content */}
          <div className="flex-1 overflow-hidden pr-2">
            <div className="mb-2 flex items-start">
              <div className="rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 p-2 dark:from-purple-500/20 dark:to-purple-700/20">
                <motion.div
                  className="text-purple-600 dark:text-purple-300"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {icon}
                </motion.div>
              </div>
              <h3 className="ml-2 mt-1 flex-1 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-gray-900 text-transparent dark:from-white dark:to-purple-200 dark:text-white">
                {title}
              </h3>
            </div>

            <div className="space-y-1.5">
              {problems.map((problem, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-1.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-500 dark:text-red-400" />
                  <p className="text-xs leading-tight text-gray-600 dark:text-gray-400">
                    {problem}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex w-2/5 items-center justify-center pl-2">
            <motion.div
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={image}
                alt={title}
                className="h-auto max-h-[150px] w-auto max-w-[95%] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Central element component
const CentralElement = () => {
  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/30 via-indigo-200/30 to-blue-200/30 blur-3xl dark:from-purple-500/10 dark:via-indigo-500/10 dark:to-blue-500/10"></div>

      <motion.div
        className="relative z-10 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full border border-purple-200/50 bg-gradient-to-br from-purple-200/40 to-indigo-200/40 dark:border-purple-500/30 dark:from-purple-600/20 dark:to-indigo-600/20"
        animate={{
          boxShadow: [
            "0 0 20px 5px rgba(168, 85, 247, 0.2)",
            "0 0 30px 8px rgba(168, 85, 247, 0.3)",
            "0 0 20px 5px rgba(168, 85, 247, 0.2)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-20"></div>

        <div className="px-4 text-center">
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Hydranode
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            AI-Powered Certification Success
          </p>
        </div>
      </motion.div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400/70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export const ProblemStatement = () => {
  const cards = [
    {
      icon: <BookOpenCheck className="h-6 w-6" />,
      title: "Study Materials",
      problems: [
        "Information overload and overwhelming content volume",
        "Outdated materials not reflecting latest exam objectives",
        "Lack of practical, hands-on application",
      ],
      image: "/assets/study-materials.png",
    },
    {
      icon: <TimerReset className="h-6 w-6" />,
      title: "Exam Preparation",
      problems: [
        "Test anxiety and performance pressure",
        "Poor time management during exams",
        "Difficulty identifying weak areas",
      ],
      image: "/assets/Exam-Prep.png",
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "Learning Experience",
      problems: [
        "Lack of engagement and motivation",
        "Generic, non-personalized learning paths",
        "Isolation during study period",
      ],
      image: "/assets/learning-experience.png",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Explanations",
      problems: [
        "Vague and incomplete explanations",
        "Complex technical jargon",
        "Lack of visual learning aids",
      ],
      image: "/assets/explanations.png",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 dark:from-[#0A051E] dark:via-[#120A2E] dark:to-[#0A051E]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
            Struggling to Pass Your IT Certifications?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Traditional certification prep methods often fall short. Let&apos;s
            look at why, and how we&apos;re solving these challenges.
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Top row */}
          <ProblemCard
            {...cards[0]}
            className="col-span-12 h-[240px] md:col-span-4"
          />

          <div className="col-span-12 h-[240px] md:col-span-4">
            <CentralElement />
          </div>

          <ProblemCard
            {...cards[1]}
            className="col-span-12 h-[240px] md:col-span-4"
          />

          {/* Middle row - full width feature */}
          <motion.div
            className="relative col-span-12 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-r from-purple-100/50 via-indigo-100/50 to-blue-100/50 p-6 dark:border-purple-500/20 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-blue-900/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="md:w-1/2">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Your AI-Powered Solution
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Hydranode uses advanced AI to create personalized learning
                  experiences, adaptive practice tests, and clear explanations
                  that address these common challenges and help you succeed in
                  your certification journey.
                </p>
              </div>
              <div className="flex justify-center md:w-1/2">
                <motion.div
                  className="relative h-[350px] w-[350px]"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/20"></div>
                  <Image
                    src="/assets/ai-question.png"
                    alt="AI-Powered Solution"
                    width={100}
                    height={100}
                    className="z-10 h-full w-full object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom row */}
          <ProblemCard
            {...cards[2]}
            className="col-span-12 h-[240px] md:col-span-4"
          />

          <motion.div
            className="relative col-span-12 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 p-6 dark:border-purple-500/20 dark:from-purple-900/20 dark:to-indigo-900/20 md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"></div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <motion.div
                className="mb-4 text-purple-600 dark:text-purple-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16L16 12L12 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Ready to Transform Your Learning?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experience how our AI-powered platform can help you overcome
                these challenges and succeed in your certification journey.
              </p>
            </div>
          </motion.div>

          <ProblemCard
            {...cards[3]}
            className="col-span-12 h-[240px] md:col-span-4"
          />
        </div>
      </div>
    </section>
  );
};
