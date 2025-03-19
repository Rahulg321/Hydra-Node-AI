import { Instagram, Facebook, Twitter, Globe } from "lucide-react";
import Image from "next/image";

type BlogPost = {
  id: number;
  title: string;
  author: string;
  company: string;
  highlight?: boolean;
};

export default function FeaturesBlogsSection() {
  const blogs = [
    {
      title: "AI and LLMs: Bridging Language Barriers in Global Education",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      description:
        "In recent years, Artificial Intelligence (AI) and Large Language Models (LLMs) have revolutionized various industries, including education...",
      link: "https://medium.com/@hydranodeai/ai-and-llms-bridging-language-barriers-in-global-education-983a036165af",
      highlight: false,
    },
    {
      title: "Revolutionizing STEM Education with AI and Blockchain",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      description:
        "The landscape of STEM (Science, Technology, Engineering, and Mathematics) education faces significant challenges today. Traditional teaching methods often...",
      link: "https://medium.com/@hydranodeai/revolutionizing-stem-education-with-ai-and-blockchain-47e84cacc962",
      highlight: true,
    },
    {
      title: "Blockchain Credentials: The Future of Academic Certification",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
      description:
        "Blockchain technology, originally devised for the digital currency Bitcoin, is now being adapted for various other uses, including academic certifications...",
      link: "https://medium.com/@hydranodeai/blockchain-credentials-the-future-of-academic-certification-927ac080ee95",
      highlight: false,
    },
    {
      title: "The Road Ahead: Predictions for AI, LLM and Blockchain in EdTech",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      description:
        "As we stand at the intersection of education and technology, the convergence of AI, Large Language Models (LLMs), and blockchain is reshaping...",
      link: "https://medium.com/@hydranodeai/the-road-ahead-predictions-for-ai-llm-and-blockchain-in-edtech-106274f7fee5",
      highlight: true,
    },
  ];

  return (
    <div className="py-20">
      <div className="mx-auto px-4">
        <h2 className="transducer-font mb-16 text-center text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
          OUR BLOGS
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((post, index) => (
            <div
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-zinc-800"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="flex flex-grow flex-col p-5">
                {/* Social icons */}
                <div className="mb-4 flex gap-3">
                  <Instagram
                    size={16}
                    className="text-gray-400 transition-colors hover:text-white"
                  />
                  <Facebook
                    size={16}
                    className="text-gray-400 transition-colors hover:text-white"
                  />
                  <Twitter
                    size={16}
                    className="text-gray-400 transition-colors hover:text-white"
                  />
                  <Globe
                    size={16}
                    className="text-gray-400 transition-colors hover:text-white"
                  />
                </div>

                {/* Blog title */}
                <h3 className="mb-3 text-lg font-medium">
                  {post.highlight ? (
                    <span>
                      {post.title.split(" ").map((word, i, arr) =>
                        i >= arr.length - 3 ? (
                          <span key={i} className="text-orange-400">
                            {word}{" "}
                          </span>
                        ) : (
                          <span key={i}>{word} </span>
                        ),
                      )}
                    </span>
                  ) : (
                    post.title
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
