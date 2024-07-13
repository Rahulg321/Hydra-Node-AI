import React from "react";

const RewardCard = ({
  title,
  apy,
  color,
  icon,
}: {
  title: string;
  apy: number;
  color: string;
  icon: string;
}) => {
  return (
    <div className={`relative w-64 h-48 ${color} rounded-lg overflow-hidden`}>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-l-[64px] border-t-white border-l-transparent opacity-20"></div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          {/* <img src={icon} alt={title} className="w-8 h-8" /> */}
          <span className="text-white text-lg font-bold">{apy}% APY</span>
        </div>
        <div>
          <p className="text-white text-sm mb-1">Get</p>
          <h2 className="text-white text-2xl font-bold">{title}</h2>
        </div>
      </div>
    </div>
  );
};

const RewardCards = () => {
  return (
    <div className="flex">
      <RewardCard
        title="Professional Reward"
        apy={20}
        color="bg-blue-400"
        icon="/path-to-professional-icon.png"
      />
      <RewardCard
        title="Specialist Reward"
        apy={30}
        color="bg-orange-400"
        icon="/path-to-specialist-icon.png"
      />
      <RewardCard
        title="Associate Reward"
        apy={10}
        color="bg-red-400"
        icon="/path-to-associate-icon.png"
      />
    </div>
  );
};

export default RewardCards;
