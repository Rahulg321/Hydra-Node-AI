"use client";

import React from "react";
import { motion } from "framer-motion";

const technologies = [
  {
    name: "Microsoft",
    description: "Azure AI Infrastructure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
  },
  {
    name: "OpenAI",
    description: "Advanced AI Models",
    logoLight:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
    logoDark:
      "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png",
  },
  {
    name: "Hugging Face",
    description: "Model Hub Integration",
    logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  },
  {
    name: "NVIDIA",
    description: "GPU Acceleration",
    logoLight:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
    logoDark:
      "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-vert-500x200-2c50-d@2x.png",
  },
];

const OurPartners = () => {
  return (
    <section className="dark:to-dark-lighter overflow-hidden bg-gradient-to-b from-transparent to-gray-50 py-16">
      <div className="container mx-auto mb-8 px-4">
        <h2 className="text-center text-2xl font-semibold text-gray-600 dark:text-gray-400">
          Powered by Industry Leaders
        </h2>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="dark:from-dark absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent"></div>
        <div className="dark:from-dark absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent"></div>

        {/* Single Scrolling Row */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{
              x: [0, -100 * technologies.length],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="flex gap-16 whitespace-nowrap py-8"
          >
            {[...technologies, ...technologies, ...technologies].map(
              (tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="dark:bg-dark-card group flex min-w-[280px] items-center gap-4 rounded-xl bg-white px-8 py-4 shadow-md transition-transform hover:scale-105"
                >
                  <div className="flex h-16 w-16 items-center justify-center p-2">
                    {"logo" in tech ? (
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <>
                        <img
                          src={tech.logoLight}
                          alt={`${tech.name} logo`}
                          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 dark:hidden"
                        />
                        <img
                          src={tech.logoDark}
                          alt={`${tech.name} logo`}
                          className="hidden max-h-full max-w-full object-contain transition-transform group-hover:scale-110 dark:block"
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{tech.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
