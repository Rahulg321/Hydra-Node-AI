"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  subtitle: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

const FeaturedBlogsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Blog data
  const blogs: BlogPost[] = [
    {
      title: "AI and LLMs: Bridging Language Barriers in Global Education",
      subtitle: "Breaking down communication barriers",
      excerpt:
        "In recent years, Artificial Intelligence and Large Language Models (LLMs) have revolutionized various industries, including education...",
      imageUrl:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      url: "https://medium.com/@hydranodeai/ai-and-llms-bridging-language-barriers-in-global-education-983a036165af",
    },
    {
      title: "Revolutionizing STEM Education with AI and Blockchain",
      subtitle: "The future of technical learning",
      excerpt:
        "The integration of AI and blockchain technologies is transforming how STEM subjects are taught and learned...",
      imageUrl:
        "https://images.unsplash.com/photo-1581089781785-603411fa81e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      url: "https://medium.com/@hydranodeai/revolutionizing-stem-education-with-ai-and-blockchain-47e84cacc962",
    },
    {
      title: "Blockchain Credentials: The Future of Academic Certification",
      subtitle: "Secure, verifiable credentials",
      excerpt:
        "Traditional academic credentials are being reimagined through blockchain technology, offering unprecedented security and verification...",
      imageUrl:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      url: "https://medium.com/@hydranodeai/blockchain-credentials-the-future-of-academic-certification-927ac080ee95",
    },
    {
      title:
        "The Road Ahead: Predictions for AI, LLM, and Blockchain in EdTech",
      subtitle: "Looking to the future",
      excerpt:
        "As we look toward the horizon of educational technology, several emerging trends are set to reshape how we learn and teach...",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      url: "https://medium.com/@hydranodeai/the-road-ahead-predictions-for-ai-llm-and-blockchain-in-edtech-106274f7fee5",
    },
    {
      title:
        "Gamification in Education: How AI is Enhancing Learning Engagement",
      subtitle: "Making learning fun and effective",
      excerpt:
        "The integration of game elements into educational contexts, powered by AI, is transforming student engagement and outcomes...",
      imageUrl:
        "https://images.unsplash.com/photo-1511213966740-24d719a0a814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      url: "https://medium.com/@hydranodeai/gamification-in-education-how-ai-is-enhancing-learning-engagement-f2f9dc0f4679",
    },
    {
      title: "The Role of Large Language Models in Modern Education",
      subtitle: "Transforming teaching and learning",
      excerpt:
        "Large Language Models are revolutionizing educational content creation, personalization, and accessibility...",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
      url: "https://medium.com/@hydranodeai/the-role-of-large-language-models-in-modern-education-63dec4cebf0f",
    },
    {
      title: "From Theory to Practice: Implementing AI in the Classroom",
      subtitle: "Practical applications of AI",
      excerpt:
        "Moving beyond theoretical discussions, this article explores practical implementations of AI in educational settings...",
      imageUrl:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      url: "https://medium.com/@hydranodeai/from-theory-to-practice-implementing-ai-in-the-classroom-631181c2fde6",
    },
    {
      title:
        "Securing Student Data with Blockchain: The New Standard in EdTech",
      subtitle: "Privacy and security in education",
      excerpt:
        "As educational technology evolves, the need for secure, transparent, and immutable student data management becomes increasingly critical...",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80",
      url: "https://medium.com/@hydranodeai/securing-student-data-with-blockchain-the-new-standard-in-edtech-7b2213323bd1",
    },
    {
      title:
        "The Future of Education: How AI and Blockchain are Transforming Learning",
      subtitle: "A new educational paradigm",
      excerpt:
        "Exploring the revolutionary impact of combining AI and blockchain technologies in education, creating new possibilities for learning...",
      imageUrl:
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      url: "https://medium.com/@hydranodeai/the-future-of-education-how-ai-and-blockchain-are-transforming-learning-a5e22b6a34ea",
    },
    {
      title: "Unpacking the Mixture of Experts (MoE): A Game-Changer in AI",
      subtitle: "Advanced AI architecture",
      excerpt:
        "Diving deep into the revolutionary Mixture of Experts architecture, exploring how it is reshaping the landscape of artificial intelligence...",
      imageUrl:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      url: "https://medium.com/@hydranodeai/unpacking-the-mixture-of-experts-moe-a-game-changer-in-ai-872eadc2e9b0",
    },
    {
      title: "The Future of AI: Corrective Retrieval Augmented Generation",
      subtitle: "Next-generation AI technology",
      excerpt:
        "Exploring the next evolution in AI technology: Corrective Retrieval Augmented Generation and its potential impact on various industries...",
      imageUrl:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80",
      url: "https://medium.com/@hydranodeai/the-future-of-ai-corrective-retrieval-augmented-generation-20e2ad6d9029",
    },
  ];

  // Duplicate blogs for infinite scroll effect
  const duplicatedBlogs = [...blogs, ...blogs];

  // Enhanced auto-scroll effect with infinite loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let startTime: number | null = null;
    const scrollSpeed = 0.5; // pixels per millisecond

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      if (!isDragging && scrollContainer) {
        // Calculate new scroll position
        scrollContainer.scrollLeft += scrollSpeed;

        // If we've scrolled past the first set of blogs, reset to beginning
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDragging]);

  // Mouse event handlers for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 dark:from-[#0A051E] dark:via-[#150D38] dark:to-[#0A051E]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            Our <span className="text-blue-500 dark:text-blue-400">Blogs</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We democratize & personalize education through AI, creating a global
            skill marketplace for continuous learning & professional growth.
          </p>
        </div>

        {/* Scrolling blog container with enhanced infinite scroll */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="hide-scrollbar -mx-4 overflow-x-auto pb-8"
            style={{ scrollBehavior: "auto" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div
              className="flex space-x-6 px-4"
              style={{ width: "max-content" }}
            >
              {duplicatedBlogs.map((blog, index) => (
                <BlogCard
                  key={index}
                  blog={blog}
                  index={index % blogs.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View all blogs button */}
        <div className="mt-10 text-center">
          <a
            href="https://medium.com/@hydranodeai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-500 transition-colors hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all articles on Medium
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    });
  }, [controls, index]);

  return (
    <motion.a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[450px] w-[350px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-100 transition-all duration-300 hover:border-blue-200 dark:border-purple-900/30 dark:bg-gradient-to-br dark:from-[#1a1333]/80 dark:via-[#1a1333]/60 dark:to-[#2a1a4a]/40 dark:shadow-purple-900/10 dark:hover:border-purple-500/30"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 dark:from-[#0A051E] dark:via-transparent dark:to-transparent"></div>
      </div>

      <div className="flex flex-grow flex-col bg-gradient-to-b from-transparent to-gray-50 p-6 dark:from-transparent dark:to-[#1a1333]/40">
        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 dark:text-white">
          {blog.title}
        </h3>
        <p className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-400">
          {blog.excerpt}
        </p>
        <div className="mt-auto flex items-center text-blue-500 dark:text-blue-400">
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </motion.a>
  );
};

export default FeaturedBlogsSection;
