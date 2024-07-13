import React from "react";
import { IoAnalytics } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiGuideLine } from "react-icons/ri";
import { IoIosGift } from "react-icons/io";

const TokenHighlightSection = () => {
  return (
    <section className="block-space big-container">
      <div>
        <h2>Hydranode Token Highlights</h2>
        <span>
          HydraNode&apos;s Crypto Staking Program is an innovative way for
          professional users to earn rewards and deepen their engagement with
          the platform.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
          <TokenHighlightCard
            icon={RiGuideLine}
            heading="Token Acquisition"
            content="Upon successfully completing a certification through HydraNode, professionals are awarded HydraNode tokens. The amount of tokens received depends on the level of certification achieved, with higher-level certifications yielding greater token rewards."
          />
          <TokenHighlightCard
            icon={IoAnalytics}
            heading="Staking Process"
            content="Users can choose to stake their earned tokens within the HydraNode platform. Staking involves locking up a certain amount of tokens in a smart contract on the blockchain, which helps to secure the network and validate transactions."
          />
          <TokenHighlightCard
            icon={IoIosGift}
            heading="Tiered Reward System"
            content="The staking rewards are tiered based on the certification level, with higher certification levels attracting higher staking reward percentages. This incentivizes users to pursue advanced certifications and engage more deeply with the HydraNode ecosystem."
          />
        </div>
      </div>
    </section>
  );
};

export default TokenHighlightSection;

const TokenHighlightCard = ({
  heading,
  icon,
  content,
}: {
  heading: string;
  icon: IconType;
  content: string;
}) => {
  return (
    <div className="bg-base">
      <div>{React.createElement(icon)}</div>
      <h4>{heading}</h4>
      <span>{content}</span>
      <div>
        <MdOutlineArrowOutward />
      </div>
    </div>
  );
};
