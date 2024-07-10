import React from "react";
import StemCard from "@/public/stem_card.png";
import Image from "next/image";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";

const FeaturedBlogsSection = () => {
  return (
    <section className="block-space big-container">
      <h2>Take a look at our Blogs</h2>
      <span>
        We democratize & personalize education through AI & blockchain, creating
        a global, decentralized skill marketplace for continuous learning &
        professional growth.
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;

function BlogCard() {
  return (
    <div>
      <Image src={StemCard} alt="" />
      <h3>Revolutionizing STEM Education with AI and Blockchain</h3>
      <p className="block">
        The landscape of STEM (Science, Technology, Engineering, and
        Mathematics) education faces significant challenges today. Traditional
        teaching methods often...
      </p>
      <ReusbaleButton>Learn More</ReusbaleButton>
    </div>
  );
}
