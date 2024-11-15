"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParticleBackground from "../ParticleBackground";
import Link from "next/link";

const VisionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden py-24"
      id="mission"
    >
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left side - 3D Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="animate-float relative z-10">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                alt="Digital Learning Illustration"
                className="mx-auto w-full max-w-md rounded-2xl"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-full w-full max-w-md -translate-x-1/2 -translate-y-1/2">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-primary/30 to-blue-600/30 blur-3xl"></div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-6 text-4xl font-bold lg:text-5xl"
            >
              Our Vision & <span className="text-primary">Mission</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              We envision a future where education and professional development
              are democratized, accessible, and rewarding for all. We aim to
              empower a global community of learners and professionals to
              acquire, improve, and share their skills in a collaborative and
              mutually beneficial environment, leveraging the power of AI and
              blockchain technology to create a decentralized skill marketplace
              that fosters innovation, progress, and economic growth.
            </motion.p>

            <Link href="/about-us">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:bg-primary-dark rounded-xl bg-primary px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Learn More
              </motion.button>
            </Link>

            {/* Background Decorative Elements */}
            <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-48 w-48 rounded-full bg-blue-500/5 blur-2xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="dark:from-dark absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default VisionSection;
