import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import TokenHeroImage from "@/public/tokenHeroImage.png";
import TokenHeroContainer from "@/public/TokenHeroContainer.png";
import ReusbaleButton from "@/components/ComponentButtons/ReusbaleButton";

const TokenHero = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <FaStar />
          <span>The Keystone of Education</span>
          <h1>Explore the Future of Education 3.0 with HydraNode Token</h1>
          <span>
            HydraNode token is poised to become the cornerstone of the Education
            3.0 ecosystem, designed to support educational organizations,
            companies, lecturers, high-profile executives, and other experts
            whose contributions are invaluable to our users and mission.
          </span>
          <ReusbaleButton>Get Token</ReusbaleButton>
          <ReusbaleButton>Learn More</ReusbaleButton>
        </div>
        <div>
          <Image src={TokenHeroImage} alt="" />
          <Image src={TokenHeroContainer} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TokenHero;
