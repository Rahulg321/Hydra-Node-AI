import clsx from "clsx";
import React from "react";

const RewardStep = ({
  step,
  title,
  description,
  color,
  classname,
}: {
  step: number;
  title: string;
  description: string;
  color: string;
  classname?: string;
}) => (
  <div className={clsx(`p-6 rounded-lg ${color} h-full`, classname)}>
    <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
    <p className="text-white mb-4">{description}</p>
    <p className="text-white font-semibold">Step {step}</p>
  </div>
);

const HowToEarnRewards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">
        How to earn <span className="text-blue-600">Rewards?</span>
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Unlock the full potential of our platform with our step-by-step
        walkthrough video. Learn how to navigate seamlessly and make the most of
        our features for an enriched learning experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RewardStep
          step={1}
          title="Purchase a subscription plan"
          description="Purchase a subscription plan according your need. The higher plan you will choose, higher reward you will get. Reward is only valid for Quarterly, Yearly & Life-time plans."
          color="bg-blue-600"
        />
        <RewardStep
          step={2}
          title="Complete a certifiacatoin"
          description="Upon successfully completing a certification through HydraNode, you will be awarded HydraNode tokens. The amount of tokens received depends on the level of certification, with higher-level certifications yielding greater token rewards."
          color="bg-blue-500"
        />
        <RewardStep
          step={3}
          title="Upload your achieved certificate"
          description="After completing your desired certification, upload it on our website and wait for verification. After successful verification we will send you the reward against your completed certification."
          color="bg-blue-100"
        />
        <RewardStep
          step={4}
          title="Get monthly tokens based on the reward"
          description="Get monthly token based on the reward. Withdraw any time. Earn upto 65% APY."
          color="bg-blue-600"
        />
      </div>
    </div>
  );
};

export default HowToEarnRewards;
