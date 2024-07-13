import Image from "next/image";
import React from "react";
import VideoGuide from "@/public/video_guide_image.png";

const VideoGuideSection = () => {
  return (
    <section className="big-container block-space">
      <div className="space-y-2 text-center">
        <h2>
          A step by step video{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Guide
          </span>
        </h2>
        <p className="md:text-lg">
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate <br /> seamlessly and make
          the most of our features for an enriched learning experience.
        </p>
      </div>
      <Image src={VideoGuide} alt="video guide" />
    </section>
  );
};

export default VideoGuideSection;
