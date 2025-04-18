"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function VendorsOverviewSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="big-container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">Certification Vendor Hub</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Your gateway to industry-leading certifications. Explore, prepare, and
          excel with our comprehensive exam platform.
        </p>
      </motion.section>
    </div>
  );
}
