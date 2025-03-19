"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { useToast } from "@/hooks/use-toast";
import submitContactForm from "@/actions/contact-email";
import { GradientButton } from "@/components/buttons/gradient-button";

const ContactForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    startTransition(async () => {
      const response = await submitContactForm(formData);
      if (response.status) {
        toast({
          title: "Submitted Contact Form ✅",
          description: response.message,
        });
      } else {
        toast({
          title: "Submitted Contact Form ❌",
          variant: "destructive",
          description: response.message,
        });
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen pt-20">
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                Get in{" "}
                <span className="text-gradient bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] text-white">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Have questions? We&apos;d love to hear from you. Send us a
                message and we&apos;ll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-8 shadow-xl md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-700"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-700"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 dark:border-gray-700 dark:bg-dark-lighter"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <GradientButton
                    type="submit"
                    disabled={isPending}
                    size={"lg"}
                  >
                    <Send className="h-5 w-5" />
                    {isPending ? "Sending..." : "Send Message"}
                  </GradientButton>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
