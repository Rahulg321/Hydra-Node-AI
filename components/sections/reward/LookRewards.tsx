import clsx from "clsx";
import React from "react";

const RewardCard = ({
  title,
  apy,
  color,
  titleColor,
  icon,
  classname,
}: {
  title: string;
  apy: number;
  color: string;
  titleColor: string;
  icon: string;
  classname?: string;
}) => {
  return (
    <div
      className={clsx(
        `relative h-48 w-64 overflow-hidden rounded-lg`,
        color,
        classname,
      )}
    >
      <div className="absolute right-0 top-0 h-0 w-0 border-l-[64px] border-t-[48px] border-l-transparent border-t-white opacity-20"></div>
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          {/* <img src={icon} alt={title} className="w-8 h-8" /> */}
          <span className="text-lg font-bold text-white">{apy}% APY</span>
        </div>
        <div>
          <h3 className="mb-1 text-sm text-white">Get</h3>
          <h2 className={clsx("font-bold", titleColor)}>{title}</h2>
        </div>
      </div>
    </div>
  );
};

const RewardCards = () => {
  return (
    <section className="block-space container">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Take a look at our
          <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Rewards
          </span>
        </h1>
        <span className="mb-8 text-center text-[#64607D]">
          Unlock the full potential of our platform with our step-by-step
          walkthrough video. Learn how to navigate <br />
          the platform seamlessly and make the most of our features for an
          enriched learning experience.
        </span>
      </div>
      <div className="flex gap-4">
        <RewardCard
          title="Professional Reward"
          apy={20}
          color="bg-gradient-to-b from-[#D2E0F6] to-[#5E6A99]"
          titleColor="text-gray-300"
          icon="/path-to-professional-icon.png"
          classname="flex-1"
        />
        <RewardCard
          title="Specialist Reward"
          apy={30}
          color="bg-gradient-to-b from-[#F6CF9C] to-[#F17312]"
          titleColor="bg-gradient-to-r from-[#FFFDED] to-[#F5DAAE] bg-clip-text text-transparent"
          icon="/path-to-specialist-icon.png"
          classname="flex-1"
        />
        <RewardCard
          title="Associate Reward"
          apy={10}
          color="bg-gradient-to-b from-[#F3E0D3] to-[#8E4D35]"
          titleColor="bg-gradient-to-r from-[#FFFDED] to-[#F5DAAE] bg-clip-text text-transparent"
          icon="/path-to-associate-icon.png"
          classname="flex-1"
        />
      </div>
    </section>
  );
};

export default RewardCards;
