"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Computer Science Professor, Stanford",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    quote:
      "HydraNode has transformed how we teach advanced computing concepts.",
  },
  {
    name: "James Wilson",
    role: "Lead Instructor, Udacity",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    quote: "The AI-driven personalization is simply revolutionary.",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Director of E-Learning, MIT",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    quote: "A game-changer for interactive online education.",
  },
  {
    name: "Michael Chang",
    role: "Senior Developer, Google",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    quote: "The certification tracking system is incredibly effective.",
  },
  {
    name: "Dr. Lisa Thompson",
    role: "AI Research Lead, OpenAI",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    quote: "Perfect blend of AI and educational methodology.",
  },
  {
    name: "Robert Martinez",
    role: "CTO, EdTech Solutions",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    quote: "HydraNode sets new standards in educational technology.",
  },
];

const TestimonialCard = ({ testimonial }: any) => (
  <div className="dark:bg-dark-card mx-4 w-[400px] rounded-xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-800">
    <div className="flex items-center gap-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h3>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>
        <p className="text-sm text-primary">{testimonial.role}</p>
      </div>
    </div>
    <p className="mt-4 text-gray-600 dark:text-gray-400">
      &quot;{testimonial.quote}&quot;
    </p>
  </div>
);

const SocialProof = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container relative z-10 mx-auto mb-12 px-4">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of professionals and learners who trust HydraNode
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="dark:from-dark absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="dark:from-dark absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

        <Marquee gradient={false} speed={40} pauseOnHover={true}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
    </section>
  );
};

export default SocialProof;
