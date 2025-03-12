"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RainbowButton } from "../rainbow-button";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex items-center gap-2"
            >
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
                <Brain className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  AI-Powered Learning Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="animate-gradient mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-4xl font-bold text-transparent dark:to-blue-400 lg:text-6xl"
            >
              Ace your certifications with AI-powered precision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Experience the future of exam preparation with Hydranode&apos;s
              advanced AI technology. Get realistic practice, instant feedback,
              and personalized learning paths.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <RainbowButton
                className="bg-primary text-white dark:text-black"
                onClick={() => {
                  router.push("vendors");
                }}
              >
                Start your free Exam
              </RainbowButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-6"
            >
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 1}`}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-dark"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  1000+
                </span>{" "}
                professionals
                <br />
                already learning
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <Image
                src={"/illustrations/main-illust.png"}
                width={1000}
                height={1000}
                alt="AI Learning Platform"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-dark-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Success Rate</div>
                  <div className="text-2xl font-bold text-primary">98%</div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/30 to-blue-600/30 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
