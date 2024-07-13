import clsx from "clsx";
import React from "react";

const RewardStep = ({
  step,
  title,
  description,
  color,
  variant = "white",
  classname,
}: {
  step: number;
  title: string;
  description: string;
  color: string;
  variant?: "white" | "blue";
  classname?: string;
}) => (
  <div className={clsx(`rounded-lg p-6 ${color} h-full`, classname)}>
    <h3
      className={clsx(
        "mb-4 font-bold",
        variant === "white" && "text-white",
        variant === "blue" && "text-baseC",
      )}
    >
      {title}
    </h3>
    <p
      className={clsx(
        "mb-4",
        variant === "white" && "text-white",
        variant === "blue" && "text-base",
      )}
    >
      {description}
    </p>
    <p
      className={clsx(
        "font-bold",
        variant === "white" && "text-white",
        variant === "blue" && "text-base",
      )}
    >
      Step {step}
    </p>
  </div>
);

const HowToEarnRewards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-center text-3xl font-bold">
          How to earn{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Rewards?
          </span>
        </h1>
        <span className="mb-8 text-center text-[#64607D]">
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate <br /> seamlessly and make
          the most of our features for an enriched learning experience.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <RewardStep
          step={1}
          title="Purchase a subscription plan"
          description="Purchase a subscription plan according your need. The higher plan you will choose, higher reward you will get. Reward is only valid for Quarterly, Yearly & Life-time plans."
          color="bg-base"
        />
        <RewardStep
          step={2}
          title="Complete a certification"
          description="Upon successfully completing a certification through HydraNode, you will be awarded HydraNode tokens. The amount of tokens received depends on the level of certification, with higher-level certifications yielding greater token rewards."
          color="bg-[#F4F2FF]"
          variant="blue"
          classname="md:col-span-2"
        />
        <RewardStep
          step={3}
          title="Upload your achieved certificate"
          description="After completing your desired certification, upload it on our website and wait for verification. After successful verification we will send you the reward against your completed certification."
          color="bg-[#F4F2FF]"
          variant="blue"
          classname="md:col-span-2"
        />
        <RewardStep
          step={4}
          title="Get monthly tokens based on the reward"
          description="Get monthly token based on the reward. Withdraw any time. Earn upto 65% APY."
          color="bg-base"
        />
      </div>
    </div>
  );
};

export default HowToEarnRewards;
