"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";

const blogs = [
  {
    title: "AI and LLMs: Bridging Language Barriers in Global Education",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    description:
      "In recent years, Artificial Intelligence (AI) and Large Language Models (LLMs) have revolutionized various industries, including education...",
    link: "https://medium.com/@hydranodeai/ai-and-llms-bridging-language-barriers-in-global-education-983a036165af",
  },
  {
    title: "Revolutionizing STEM Education with AI and Blockchain",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    description:
      "The landscape of STEM (Science, Technology, Engineering, and Mathematics) education faces significant challenges today. Traditional teaching methods often...",
    link: "https://medium.com/@hydranodeai/revolutionizing-stem-education-with-ai-and-blockchain-47e84cacc962",
  },
  {
    title: "Blockchain Credentials: The Future of Academic Certification",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    description:
      "Blockchain technology, originally devised for the digital currency Bitcoin, is now being adapted for various other uses, including academic certifications...",
    link: "https://medium.com/@hydranodeai/blockchain-credentials-the-future-of-academic-certification-927ac080ee95",
  },
  {
    title: "The Road Ahead: Predictions for AI, LLM and Blockchain in EdTech",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description:
      "As we stand at the intersection of education and technology, the convergence of AI, Large Language Models (LLMs), and blockchain is reshaping...",
    link: "https://medium.com/@hydranodeai/the-road-ahead-predictions-for-ai-llm-and-blockchain-in-edtech-106274f7fee5",
  },
  {
    title: "Gamification in Education: How AI is Enhancing Learning Engagement",
    image:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    description:
      "The integration of gamification elements in education has revolutionized the way students learn and engage with educational content...",
    link: "https://medium.com/@hydranodeai/gamification-in-education-how-ai-is-enhancing-learning-engagement-f2f9dc0f4679",
  },
  {
    title: "The Role of Large Language Models in Modern Education",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    description:
      "Large Language Models (LLMs) are transforming the landscape of modern education, offering unprecedented opportunities for personalized learning...",
    link: "https://medium.com/@hydranodeai/the-role-of-large-language-models-in-modern-education-63dec4cebf0f",
  },
  {
    title: "From Theory to Practice: Implementing AI in the Classroom",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    description:
      "Bridging the gap between theoretical AI concepts and practical classroom implementation, this article explores effective strategies for educational integration...",
    link: "https://medium.com/@hydranodeai/from-theory-to-practice-implementing-ai-in-the-classroom-631181c2fde6",
  },
  {
    title: "Securing Student Data with Blockchain: The New Standard in EdTech",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    description:
      "As educational technology evolves, the need for secure, transparent, and immutable student data management becomes increasingly critical...",
    link: "https://medium.com/@hydranodeai/securing-student-data-with-blockchain-the-new-standard-in-edtech-7b2213323bd1",
  },
  {
    title:
      "The Future of Education: How AI and Blockchain are Transforming Learning",
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800",
    description:
      "Exploring the revolutionary impact of combining AI and blockchain technologies in education, creating new possibilities for learning...",
    link: "https://medium.com/@hydranodeai/the-future-of-education-how-ai-and-blockchain-are-transforming-learning-a5e22b6a34ea",
  },
  {
    title: "Unpacking the Mixture of Experts (MoE): A Game-Changer in AI",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
    description:
      "Diving deep into the revolutionary Mixture of Experts architecture, exploring how it is reshaping the landscape of artificial intelligence...",
    link: "https://medium.com/@hydranodeai/unpacking-the-mixture-of-experts-moe-a-game-changer-in-ai-872eadc2e9b0",
  },
  {
    title: "The Future of AI: Corrective Retrieval Augmented Generation",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    description:
      "Exploring the next evolution in AI technology: Corrective Retrieval Augmented Generation and its potential impact on various industries...",
    link: "https://medium.com/@hydranodeai/the-future-of-ai-corrective-retrieval-augmented-generation-20e2ad6d9029",
  },
];

const BlogCard = ({ blog }: any) => (
  <motion.a
    href={blog.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group mx-4 block w-[400px] overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-card"
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className="p-6">
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
        {blog.title}
      </h3>
      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
        {blog.description}
      </p>
      <div className="mt-4 flex items-center text-sm font-medium text-primary">
        Read More
        <svg
          className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </motion.a>
);

const FeaturedBlogSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden py-24" id="blogs">
      <div className="container mx-auto mb-12 px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Our <span className="text-primary">Blogs</span>
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
            We democratize & personalize education through AI & blockchain,
            creating a global, decentralized skill marketplace for continuous
            learning & professional growth.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-black" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-black" />

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-8"
        >
          {[...blogs, ...blogs].map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;
