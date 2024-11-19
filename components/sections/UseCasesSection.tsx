"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  BookOpen,
  Users,
  GraduationCap,
  Handshake,
  Trophy,
  Building,
} from "lucide-react";
import ParticleBackground from "../ParticleBackground";
import Image from "next/image";

const useCases = [
  {
    title: "Skill Development",
    description:
      "Access real-time learning solutions for upskilling or reskilling, including IT certifications, new software tools, and job-specific practical environments.",
    Icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    color: "from-[#4F46E5] to-[#7C3AED]",
  },
  {
    title: "Interactive Study Groups",
    description:
      "Form AI-moderated study groups that enhance collaboration and provide personalized insights and resources based on group dynamics and individual contributions",
    Icon: Users,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    color: "from-[#8B5CF6] to-[#6366F1]",
  },
  {
    title: "Curriculum Development",
    description:
      "Use AI to assist in developing and updating curricula, ensuring they meet current industry standards and future trends.",
    Icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    color: "from-[#6366F1] to-[#8B5CF6]",
  },
  {
    title: "Mentorship Matching",
    description:
      "AI-driven matching of professionals with mentors in their field, fostering growth through personalized guidance and support.",
    Icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    color: "from-[#7C3AED] to-[#4F46E5]",
  },
  {
    title: "Partnerships",
    description:
      "Empower existing e-learning platforms with advanced AI and blockchain integration to enhance learning experiences.",
    Icon: Building,
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800",
    color: "from-[#4F46E5] to-[#6366F1]",
  },
  {
    title: "Skill Competitions",
    description:
      "Participate in AI-driven skill competitions to test and showcase abilities, earning badges and recognitions that can be added to digital portfolios.",
    Icon: Trophy,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    color: "from-[#6366F1] to-[#7C3AED]",
  },
];

const UseCaseCard = ({ useCase, index }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                duration: 1,
                delay: index * 0.2,
              },
            }
          : {}
      }
      className="perspective group relative"
    >
      <div className="preserve-3d hover:rotate-y-12 relative h-[400px] w-full transform-gpu overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-2xl">
        {/* Front Face */}
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl bg-white dark:bg-dark-card">
          <div className="relative h-48">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={useCase.image}
                alt={useCase.title}
                fill
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-2 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${useCase.color} p-2 shadow-lg`}
                >
                  <useCase.Icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {useCase.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {useCase.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 rounded-xl bg-gradient-to-r px-6 py-3 ${useCase.color} w-full font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* 3D Effect Elements */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-y-0 right-0 w-8 skew-x-6 transform bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/5" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 blur-xl"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"
        animate={{
          y: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

const UseCasesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden py-24" id="use-cases">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Here are Several{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
              Use HydraNode in various ways to develop yourself. From students
              to working professionals, anyone can get benefited by our
              platform.
            </p>
          </motion.div>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </section>
  );
};

export default UseCasesSection;
