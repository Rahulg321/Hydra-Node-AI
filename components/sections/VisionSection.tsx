import Image from "next/image";
import React from "react";
import VisionRocket from "@/public/vision_rocket.png";
import VisionRocket23 from "@/public/3d_render_frosted_glass_blast_off_rocket 1.png";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import { Button } from "../ui/button";

const VisionSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-custom-gradient bottom-[-250px] left-[-100px] hidden size-[45rem] md:absolute"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden md:block">
          <Image src={VisionRocket23} alt="vision rocket" />
        </div>
        <div className="block-space container content-center text-right">
          <h2>
            Our Vision &{" "}
            <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p>
            We envisions a future where education and professional development
            are democratized, accessible, and rewarding for all. We aim to
            empower a global community of learners and professionals to acquire,
            improve, and share their skills in a collaborative and mutually
            beneficial environment, leveraging the power of AI and blockchain
            technology to create a decentralized skill marketplace that fosters
            innovation, progress, and economic growth.
          </p>
          <Button className="mt-6 rounded-full bg-base p-6 text-lg font-bold">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
