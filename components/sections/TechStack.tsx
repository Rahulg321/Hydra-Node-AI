"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconCloud } from "@/lib/magicui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function TechStack() {
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-[#0A051E] dark:via-[#150D38] dark:to-[#0A051E]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
            Practice Tests for{" "}
            <span className="text-purple-600 dark:text-purple-500">
              Popular Technologies
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Generate high-quality practice tests for the most in-demand
            certifications across various technologies
          </p>
        </div>

        <div className="relative flex h-[600px] items-center justify-center overflow-hidden">
          {/* Glowing orbs for depth and visual interest */}
          <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-purple-100/40 blur-3xl dark:bg-purple-600/10"></div>
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-600/10"></div>

          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-purple-600/70 dark:bg-purple-400/70"
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

          {/* Icon cloud */}
          <div className="relative z-10 h-full w-full">
            <IconCloud images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
