"use client";

import React, { useState } from "react";
import { LineChart, Smartphone, Gauge, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureModal } from "../ui/feature-modal";

interface FeatureCardProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const FeatureCard = ({
  className = "",
  icon,
  title,
  description,
  image,
  position,
}: FeatureCardProps) => {
  // Define position-specific animations and styles
  const positionStyles = {
    "top-left": "origin-bottom-right",
    "top-right": "origin-bottom-left",
    "bottom-left": "origin-top-right",
    "bottom-right": "origin-top-left",
  };

  const hoverAnimation = {
    "top-left": { rotateX: -5, rotateY: 5 },
    "top-right": { rotateX: -5, rotateY: -5 },
    "bottom-left": { rotateX: 5, rotateY: 5 },
    "bottom-right": { rotateX: 5, rotateY: -5 },
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-white/50 p-6 dark:bg-gradient-to-b dark:from-purple-950/50 dark:to-purple-900/20 ${positionStyles[position]} ${className} border border-gray-200 dark:border-purple-500/20`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverAnimation[position]}
      transition={{ duration: 0.5 }}
    >
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10 dark:opacity-20"></div>

      {/* Glowing orb effect */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20 dark:bg-purple-500/20 dark:group-hover:bg-purple-500/30"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4">
          <motion.div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-500/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>

          <motion.h3
            className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {title}
          </motion.h3>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        {/* Image */}
        {image && (
          <div className="mt-auto flex flex-grow items-center justify-center overflow-hidden rounded-lg">
            <motion.img
              src={image}
              alt={`${title} illustration`}
              className="h-auto max-h-[120px] w-auto max-w-[85%] object-scale-down"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Animated border */}
      <div className="absolute inset-px rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-purple-500/50"></div>

      {/* Animated dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
    </motion.div>
  );
};

// 3D Cube component for the center
const CenterCube = () => {
  return (
    <div className="perspective-[1000px] relative flex h-full w-full items-center justify-center">
      <motion.div
        className="transform-style-3d relative h-[200px] w-[200px]"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Front face */}
        <div className="translate-z-[100px] absolute flex h-full w-full transform items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/20 backdrop-blur-sm">
          <div className="text-center text-white">
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-4xl font-bold text-transparent">
              Hydra
            </div>
            <div className="mt-2 text-sm text-purple-300">
              AI-Powered Exam Prep
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="-translate-z-[100px] rotate-y-180 absolute h-full w-full transform rounded-xl border border-purple-500/30 bg-purple-500/20 backdrop-blur-sm"></div>

        {/* Left face */}
        <div className="rotate-y-90 absolute h-full w-full -translate-x-[100px] transform rounded-xl border border-purple-500/30 bg-purple-600/20 backdrop-blur-sm"></div>

        {/* Right face */}
        <div className="-rotate-y-90 absolute h-full w-full translate-x-[100px] transform rounded-xl border border-purple-500/30 bg-purple-600/20 backdrop-blur-sm"></div>

        {/* Top face */}
        <div className="rotate-x-90 absolute h-full w-full -translate-y-[100px] transform rounded-xl border border-purple-500/30 bg-purple-700/20 backdrop-blur-sm"></div>

        {/* Bottom face */}
        <div className="-rotate-x-90 absolute h-full w-full translate-y-[100px] transform rounded-xl border border-purple-500/30 bg-purple-700/20 backdrop-blur-sm"></div>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-3xl"></div>
    </div>
  );
};

const Features = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 dark:from-[#0A051E] dark:via-[#150D38] dark:to-[#0A051E]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
            Smart and effective
            <span className="text-purple-500"> exam prep</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master your certification journey with intelligent tools. Practice
            smarter, not harder.
          </p>
        </div>

        <div className="mt-16 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3">
          {/* Top row */}
          <FeatureCard
            className="h-[300px]"
            icon={<BookOpen className="h-5 w-5 text-purple-400" />}
            title="AI Practice Tests"
            description="Dynamic question generation that adapts to your learning style and knowledge gaps."
            image="/assets/ai-question.png"
            position="top-left"
          />

          {/* Center 3D element */}
          <div className="relative h-[300px]">
            <CenterCube />
          </div>

          <FeatureCard
            className="h-[300px]"
            icon={<LineChart className="h-5 w-5 text-purple-400" />}
            title="Performance Analytics"
            description="Track your progress with detailed insights and personalized recommendations."
            image="/assets/performance.png"
            position="top-right"
          />

          {/* Bottom row */}
          <FeatureCard
            className="h-[300px]"
            icon={<Smartphone className="h-5 w-5 text-purple-400" />}
            title="Mobile Learning"
            description="Study anywhere, anytime with our mobile-optimized platform."
            image="/assets/mobile-learning.png"
            position="bottom-left"
          />

          <div className="flex h-[300px] items-center justify-center md:col-start-2 md:col-end-3">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-4 flex justify-center text-purple-400"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="40"
                  height="40"
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
              <button
                className="font-medium text-gray-900 transition-colors hover:text-purple-600 dark:text-white dark:hover:text-purple-300"
                onClick={() => setIsModalOpen(true)}
              >
                Explore all features
              </button>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Discover how our AI-powered platform can help you succeed
              </p>
            </motion.div>
          </div>

          <FeatureCard
            className="h-[300px]"
            icon={<Gauge className="h-5 w-5 text-purple-400" />}
            title="Advanced Assessment"
            description="Get detailed feedback and scoring on your practice exams."
            image="/assets/advanced-assessment.png"
            position="bottom-right"
          />
        </div>
      </div>

      {/* Feature Modal */}
      {/* <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </section>
  );
};

export default Features;
