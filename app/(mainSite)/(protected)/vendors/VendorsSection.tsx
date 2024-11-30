"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Trophy,
  Users,
  Award,
  BarChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Overview Section */}
      <section className="mb-16" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-bold"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Multiple Vendors",
              content:
                "Access certification exams from various industry-leading vendors, all in one place.",
            },
            {
              icon: BookOpen,
              title: "Comprehensive Exam Prep",
              content:
                "Prepare thoroughly with our extensive question banks and up-to-date content.",
            },
            {
              icon: BarChart,
              title: "Performance Tracking",
              content:
                "Monitor your progress and identify areas for improvement with advanced analytics.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 opacity-50" />
                <CardHeader>
                  <CardTitle className="relative z-10 flex items-center">
                    <item.icon className="mr-2 h-6 w-6 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: 1,
              title: "Choose a Vendor",
              content:
                "Select from our list of reputable certification providers in the sidebar.",
            },
            {
              step: 2,
              title: "Select an Exam",
              content:
                "Browse through available certifications and choose the one that aligns with your career goals.",
            },
            {
              step: 3,
              title: "Start Practicing",
              content:
                "Take practice quizzes, review explanations, and track your progress as you prepare for your exam.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-blue-600">
                {item.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="mb-16" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-bold"
        >
          Why Choose Our Platform?
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: CheckCircle,
              title: "Verified Content",
              content:
                "Our exam content is meticulously curated and verified by industry experts to ensure accuracy and relevance.",
            },
            {
              icon: Award,
              title: "Up-to-Date Material",
              content:
                "Stay ahead with our regularly updated question banks that reflect the latest changes in certification exams.",
            },
            {
              icon: Trophy,
              title: "Personalized Learning",
              content:
                "Benefit from adaptive quizzes and personalized study plans tailored to your strengths and weaknesses.",
            },
            {
              icon: Users,
              title: "Community Support",
              content:
                "Connect with fellow learners, share experiences, and get support from our community of certification aspirants.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 opacity-50" />
                <CardHeader>
                  <CardTitle className="relative z-10 flex items-center">
                    <item.icon className="mr-2 h-6 w-6 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 p-8 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Advance Your Career?
        </h2>
        <p className="mb-6 text-xl text-muted-foreground">
          Start your certification journey today. Choose a vendor from the
          sidebar and take the first step towards professional growth.
        </p>
        <Button size="lg" asChild>
          <Link href="#">
            Explore Vendors <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.section>

      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </div>
  );
}
