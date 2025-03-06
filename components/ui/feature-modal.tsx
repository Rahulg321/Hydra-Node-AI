"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Brain, LightbulbIcon, Network } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const features = [
    {
      icon: <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Real-Time Exam Engine",
      description:
        "Experience the actual exam interface, time limits, and question formats to build confidence and reduce test anxiety.",
      image: "/dist/assets/Real-Time-Exam-Engine.png",
      color:
        "from-blue-100/50 to-blue-200/30 dark:from-blue-500/20 dark:to-blue-600/10",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "AI-Curated Exam Materials",
      description:
        "Our AI constantly analyzes exam trends and updates our question bank to ensure you're studying the most relevant content.",
      image: "/dist/assets/AI-Curated-Exam-Materials.png",
      color:
        "from-purple-100/50 to-purple-200/30 dark:from-purple-500/20 dark:to-purple-600/10",
    },
    {
      icon: (
        <LightbulbIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
      ),
      title: "Detailed Explanations",
      description:
        "Every question comes with clear, concise explanations for each answer option, helping you grasp the underlying concepts.",
      image: "/dist/assets/Detailed_Explanations.png",
      color:
        "from-yellow-100/50 to-yellow-200/30 dark:from-yellow-500/20 dark:to-yellow-600/10",
    },
    {
      icon: <Network className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      title: "GraphRAG Based Q&A Generation",
      description:
        "Leveraging advanced GraphRAG technology, we provide intelligent and contextually relevant questions, enhancing your understanding and retention.",
      image: "/dist/assets/GraphRAG-Based-QA.png",
      color:
        "from-cyan-100/50 to-cyan-200/30 dark:from-cyan-500/20 dark:to-cyan-600/10",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-purple-500/30 dark:bg-gradient-to-b dark:from-[#0A051E] dark:to-[#150D38]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-gray-200 p-8 text-center dark:border-purple-500/20">
              <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                All Features
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Discover our comprehensive suite of AI-powered tools designed to
                help you ace your certification exams
              </p>
            </div>

            {/* Feature grid - 2x2 layout */}
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br shadow-lg shadow-gray-100/50 transition-all duration-300 hover:border-gray-300 dark:border-purple-500/20 dark:shadow-purple-900/10 dark:hover:border-purple-500/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#0A051E]/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 dark:from-[#0A051E] dark:via-transparent dark:to-transparent"></div>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative z-10 h-auto max-h-[180px] w-auto max-w-[90%] object-contain"
                    />
                  </div>

                  <div className="flex flex-grow flex-col border-t border-gray-100 bg-gradient-to-br p-6 dark:border-purple-500/10">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-center border-t border-gray-200 p-6 dark:border-purple-500/20">
              <button
                className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
