import React from "react";
import { IoTrophy } from "react-icons/io5";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import { Button } from "../ui/button";
import { FaRobot } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import clsx from "clsx";

const InnovativeFeaturesSection = () => {
  return (
    <section className="block-space-large bg-base">
      <div className="big-container">
        <div className="mb-12 space-y-4 text-center text-white">
          <h2>Explore our innovative features</h2>
          <p className="text-white">
            Unlock the essence of our offerings with these key highlights,
            showcasing <br /> the most impactful features and benefits tailored
            for you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FaRobot className="h-8 w-8 text-base" />}
            heading="Personalized Learning"
            content="AI-powered educational tools provide personalized learning paths, adaptive learning modules, and micro-learning resources tailored to individual needs."
          />
          <FeatureCard
            icon={<IoTrophy className="h-8 w-8 text-yellow-400" />}
            heading="Rewards & Certifications"
            content="Earn verifiable, blockchain-verified certificates that ensure global recognition and authenticity, opening doors to career opportunities."
          />
          <FeatureCard
            icon={<IoHome className="h-8 w-8 text-base" />}
            heading="Anytime, Anywhere"
            content="Leverage advanced algorithms and data analytics for efficient candidate matching, streamlining the hiring process."
          />
          <FeatureCard
            icon={<FaRegCircleCheck className="h-8 w-8 text-yellow-400" />}
            heading="AI Based Hiring Platform"
            content="Leverage advanced algorithms and data analytics for efficient candidate matching, streamlining the hiring process."
          />
          <FeatureCard
            icon={<MdOutlineAnalytics className="h-8 w-8 text-base" />}
            heading="Performance Analytics"
            content="Use AI to analyze employee performance data, identify skill gaps, and recommend personalized development plans."
          />
          <FeatureCard
            icon={<IoIosChatboxes className="h-8 w-8 text-yellow-400" />}
            heading="Interview Preparation"
            content="Utilize an AI-based system for technical interview preparation, offering practice questions, simulated interviews, and feedback."
          />
        </div>
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="rounded-full border-2 p-6 text-lg font-bold text-[#5d5fef]"
          >
            Get a Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovativeFeaturesSection;

function FeatureCard({
  icon,
  heading,
  content,
  iconColor,
}: {
  icon: any;
  heading: string;
  content: string;
  iconColor?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 md:px-6 md:py-10">
      <div className={clsx("mb-4")}>{icon}</div>

      <h3>{heading}</h3>
      <p className="font-semibold">{content}</p>
    </div>
  );
}
