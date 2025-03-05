"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Target,
  LineChart,
  FlaskConical,
  Users,
  TrendingUp,
  CheckCircle2,
  UserPlus,
  Laptop,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TabButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 sm:w-auto sm:px-6 sm:py-3",
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/25"
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-card",
    )}
  >
    {children}
  </button>
);

const features = [
  {
    Icon: LineChart,
    title: "Study Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics. Track completion rates, test scores, and identify areas for improvement.",
    diagram: (
      <div className="relative h-48 p-4">
        <div className="absolute inset-0 grid grid-cols-5 items-end gap-4 px-8">
          {[65, 75, 85, 90, 95].map((height, index) => (
            <motion.div
              key={index}
              className="relative flex h-full flex-col justify-end"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/10 to-primary/30"
                style={{ height: `${height}%` }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  },
                }}
              >
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {height}%
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    ),
  },
  {
    Icon: FlaskConical,
    title: "Practice Exam Simulations",
    description:
      "Experience real exam conditions with our advanced simulation engine. Get detailed feedback and performance analytics.",
    diagram: (
      <div className="relative h-48 p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-full max-w-sm rounded-lg bg-primary/5 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {[85, 92, 78].map((score, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Practice Test {index + 1}</span>
                    <motion.span
                      className="font-medium text-primary"
                      animate={{
                        scale: [1, 1.1, 1],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                        },
                      }}
                    >
                      {score}%
                    </motion.span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: index * 0.2, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    Icon: Users,
    title: "Expert Mentorship",
    description:
      "Connect with industry professionals for personalized guidance. Get expert insights and practical advice for your certification journey.",
    diagram: (
      <div className="relative h-48 p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/10"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(0, 163, 255, 0)",
                  "0 0 0 20px rgba(0, 163, 255, 0.1)",
                  "0 0 0 0 rgba(0, 163, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <GraduationCap className="h-8 w-8 text-primary" />
            </motion.div>

            {[0, 72, 144, 216, 288].map((degree, index) => (
              <motion.div
                key={degree}
                className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary/5"
                style={{
                  transform: `rotate(${degree}deg) translate(60px) rotate(-${degree}deg)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              >
                <UserPlus className="h-5 w-5 text-primary" />
              </motion.div>
            ))}

            <motion.div
              className="absolute inset-0 left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/10"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: TrendingUp,
    title: "Career Advancement Paths",
    description:
      "Visualize your career progression with our advanced career pathing tools. Map your journey from certification to career success.",
    diagram: (
      <div className="relative h-48 p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <motion.div
              className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex justify-between">
              {["Junior", "Mid-Level", "Senior", "Lead"].map((level, index) => (
                <motion.div
                  key={level}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    className="z-10 mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      },
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </motion.div>
                  <motion.span
                    className="text-sm font-medium text-primary"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      },
                    }}
                  >
                    {level}
                  </motion.span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {`Level ${index + 1}`}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const Features = ({ session }: { session: Session | null }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const router = useRouter();
  const ActiveIcon = features[activeTab].Icon;

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
      id="features"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mx-auto max-w-7xl"
        >
          {/* Main Section Header */}
          <motion.div
            className="mb-8 text-center sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block font-semibold text-primary"
            >
              Your Path to Success
            </motion.span>
            <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 sm:mb-6 sm:text-4xl lg:text-5xl">
              Accelerate Your IT Career with Expert Certification Prep
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base text-gray-600 dark:text-gray-400 sm:mb-12 sm:text-xl">
              Comprehensive preparation tools and resources designed for your
              certification success
            </p>

            {/* Tabs */}
            <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:flex-wrap sm:justify-center">
              {features.map((feature, index) => (
                <TabButton
                  key={index}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                >
                  {feature.title}
                </TabButton>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm dark:border-gray-800 dark:bg-dark-card/50 sm:p-6 lg:p-8"
            >
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                <div className="relative w-full flex-1">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-2xl" />
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14">
                    <ActiveIcon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-2xl">
                    {features[activeTab].title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                    {features[activeTab].description}
                  </p>
                </div>
                <motion.div
                  className="w-full flex-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-colors duration-300 hover:border-primary/50 dark:border-gray-800 dark:bg-dark-card dark:hover:border-primary/50 sm:p-6">
                    {features[activeTab].diagram}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center sm:mt-16 lg:mt-24"
          >
            <button
              className="w-full transform rounded-xl bg-primary px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
              onClick={() => {
                if (session) {
                  router.push("/vendors");
                } else {
                  router.push("/login");
                }
              }}
            >
              Start Your Certification Journey
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
