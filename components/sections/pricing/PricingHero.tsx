import React from "react";

const PricingHero = () => {
  return (
    <section className="block-space big-container">
      <div className="mt-4 space-y-4 text-center lg:mt-12">
        <h1>
          Our pricing{" "}
          <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            plans
          </span>
        </h1>
        <p className="font-semibold text-muted-foreground">
          Welcome to HydraNode&apos;s pricing page! We offer flexible plans to
          cater to your learning and professional <br /> development needs.
          Whether you&apos;re a student, professional, or business, HydraNode
          provides <br /> personalized, practical, and verifiable skill-building
          experiences.
        </p>
      </div>
    </section>
  );
};

export default PricingHero;
