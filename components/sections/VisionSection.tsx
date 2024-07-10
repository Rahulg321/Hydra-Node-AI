import Image from "next/image";
import React from "react";
import VisionRocket from "@/public/vision_rocket.png";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";

const VisionSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Image src={VisionRocket} alt="vision rocket" />
        </div>
        <div>
          <h2>Our Vision & Mission</h2>
          <span>
            We envisions a future where education and professional development
            are democratized, accessible, and rewarding for all. We aim to
            empower a global community of learners and professionals to acquire,
            improve, and share their skills in a collaborative and mutually
            beneficial environment, leveraging the power of AI and blockchain
            technology to create a decentralized skill marketplace that fosters
            innovation, progress, and economic growth.
          </span>
          <ReusbaleButton>Learn More</ReusbaleButton>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
