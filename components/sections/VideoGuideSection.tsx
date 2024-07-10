import Image from "next/image";
import React from "react";
import VideoGuide from "@/public/video_guide_image.png";

const VideoGuideSection = () => {
  return (
    <section>
      <h2>A step by step video Guide</h2>
      <span>
        Unlock the full potential of our platform with our step-by-step
        walkthrough video. Learn how to navigate seamlessly and make the most of
        our features for an enriched learning experience.
      </span>
      <Image src={VideoGuide} alt="video guide" />
    </section>
  );
};

export default VideoGuideSection;
