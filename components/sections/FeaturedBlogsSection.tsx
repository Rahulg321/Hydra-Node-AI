import React from "react";
import StemCard from "@/public/stem_card.png";
import AIBlog from "@/public/AIBlog.png";
import BlockBlog from "@/public/BlockchainBlog.png";
import Image, { StaticImageData } from "next/image";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import PrimaryButton from "../ComponentButtons/PrimaryButton";
import { Button } from "../ui/button";

const FeaturedBlogsSection = () => {
  return (
    <section className="block-space container">
      <div className="mb-6 text-center lg:mb-12">
        <h2>
          Take a look at our{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Blogs
          </span>
        </h2>
        <p>
          We democratize & personalize education through AI & blockchain,
          creating a global,
          <br /> decentralized skill marketplace for continuous learning &
          professional growth.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <BlogCard
          img={AIBlog}
          heading="AI and LLMs: Bridging Language Barriers in Global Education"
          desc="In recent years, Artificial Intelligence (AI) and Large Language Models  (LLMs) have revolutionized various industries, including education..."
        />
        <BlogCard
          img={StemCard}
          heading="Revolutionizing STEM Education with AI and Blockchain"
          desc="The landscape of STEM (Science, Technology, Engineering, and  Mathematics) education faces significant challenges today. Traditional  teaching methods often..."
        />
        <BlogCard
          img={BlockBlog}
          heading="Blockchain Credentials: The Future of Academic Certification"
          desc="Blockchain technology, originally devised for the digital currency  Bitcoin, is now being adapted for various other uses, including academic  certifications..."
        />
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;

function BlogCard({
  heading,
  desc,
  img,
  blogLink,
}: {
  heading: string;
  desc: string;
  img: StaticImageData;
  blogLink?: string;
}) {
  return (
    <div>
      <Image src={img} alt="" />
      <h3 className="mt-6">{heading}</h3>
      <p className="block">{desc}</p>
      <Button
        variant="outline"
        className="mt-6 w-full rounded-full border-2 border-base p-6 text-lg font-bold text-[#5d5fef]"
      >
        Get Rewards
      </Button>
    </div>
  );
}
