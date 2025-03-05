"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wallet,
  Rocket,
  LineChart,
  Clock,
  Layers,
  UserCog,
  Database,
  Box,
  BookOpen,
} from "lucide-react";
import ParticleBackground from "../ParticleBackground";
import Image from "next/image";

const features = {
  user: [
    {
      title: "Skills Marketplace",
      Icon: Rocket,
    },
    {
      title: "Performance Dashboard",
      Icon: LineChart,
    },
    {
      title: "Insights & Analytics",
      Icon: Clock,
    },
  ],
  developer: [
    {
      title: "Developer API",
      Icon: Layers,
    },
  ],
  personal: [
    {
      title: "Adaptive Interactions",
      Icon: UserCog,
    },
    {
      title: "Data Integration",
      Icon: Database,
    },
    {
      title: "User Preferences",
      Icon: Box,
    },
    {
      title: "Smart Content Delivery",
      Icon: BookOpen,
    },
  ],
};

const FeatureSection = ({ title, features, index }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                type: "spring",
                duration: 0.8,
                delay: index * 0.2,
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.02,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      className="perspective transform rounded-2xl border-gray-200 bg-white/80 p-6 ring-2 ring-primary backdrop-blur-sm dark:border-gray-800 dark:bg-dark-card/40 dark:ring-primary/40"
    >
      <h3 className="mb-4 text-lg font-semibold text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {/* @ts-ignore */}
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2 + idx * 0.1,
                    },
                  }
                : {}
            }
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <feature.Icon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {feature.title}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Solutions = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div className="relative min-h-screen" id="technology">
      <ParticleBackground />

      <section className="relative py-20">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              The Technology behind your{" "}
              <span className="text-primary">Success</span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
              The cutting-edge technology will help you to stay ahead from the
              rest of your competitors.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FeatureSection
                title="User Interface"
                features={features.user}
                index={0}
              />
              <FeatureSection
                title="Developer Interface"
                features={features.developer}
                index={1}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FeatureSection
                title="Personal Model"
                features={features.personal}
                index={3}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
