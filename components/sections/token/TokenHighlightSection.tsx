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
        <div className="mb-12 text-center">
          <h2>
            Hydranode Token{" "}
            <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>
          <p>
            HydraNode&apos;s Crypto Staking Program is an innovative way for
            professional <br /> users to earn rewards and deepen their
            engagement with the platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="rounded-xl bg-base p-4 shadow-md md:p-6 lg:p-8">
      <div className="mb-4 text-4xl text-white">
        {React.createElement(icon)}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{heading}</h3>
      <p className="text-gray-200">{content}</p>
      <div className="mt-4 text-3xl text-white">
        <MdOutlineArrowOutward />
      </div>
    </div>
  );
};
