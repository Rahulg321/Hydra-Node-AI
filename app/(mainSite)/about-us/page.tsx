"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Brain,
  Rocket,
  Target,
  Users,
  Zap,
  Lock,
  Globe,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Image from "next/image";

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: "100K+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
    { number: "200+", label: "Expert Mentors" },
    { number: "50+", label: "Global Partners" },
  ];

  const values = [
    {
      icon: Brain,
      title: "AI-First Approach",
      description:
        "Leveraging cutting-edge AI to deliver personalized learning experiences that adapt to individual needs and learning styles.",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Making quality education accessible to learners worldwide, breaking down geographical and economic barriers.",
    },
    {
      icon: Users,
      title: "Community-Centric",
      description:
        "Building a vibrant community where learners support each other, share knowledge, and grow together.",
    },
    {
      icon: Sparkles,
      title: "Innovation Focus",
      description:
        "Continuously pushing boundaries in educational technology to create more effective learning solutions.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "Committed to delivering measurable outcomes and real-world skills that advance careers.",
    },
    {
      icon: Lock,
      title: "Trust & Security",
      description:
        "Ensuring the highest standards of data protection and credential verification through blockchain technology.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-founder",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      bio: "Former Head of AI Research at DeepMind, with over 15 years of experience in machine learning and educational technology.",
    },
    {
      name: "Michael Chang",
      role: "CTO & Co-founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      bio: "Previously led blockchain initiatives at Ethereum Foundation, passionate about decentralized education systems.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Learning Officer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
      bio: "Former Professor of Educational Technology at MIT, pioneering research in adaptive learning systems.",
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-4xl font-bold md:text-5xl"
            >
              Revolutionizing Education Through{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-xl leading-relaxed text-gray-600 dark:text-gray-400"
            >
              At HydraNode, we&apos;re on a mission to democratize education
              through innovative technology. Our platform combines artificial
              intelligence and blockchain to create a learning experience
              that&apos;s personalized, verifiable, and accessible to everyone.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-2 text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                  width={800}
                  height={600}
                  alt="Team Collaboration"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg dark:bg-dark-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Global Impact</div>
                    <div className="text-2xl font-bold text-primary">100K+</div>
                  </div>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/30 to-blue-600/30 blur-3xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="relative"
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Our Mission
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                We envision a world where quality education is accessible to
                everyone, regardless of their location or background. Through
                our innovative platform, we&apos;re breaking down traditional
                barriers to learning and creating opportunities for global
                knowledge sharing.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                By combining AI-powered personalization with blockchain-verified
                credentials, we&apos;re not just teaching – we&apos;re
                transforming how people learn, grow, and succeed in their
                careers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref} className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The principles that guide our mission to transform education
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default AboutPage;
