import Image from "next/image";
import React from "react";
import InteractiveStudyGroup from "@/public/interactive_study_group.png";
import CirriculumDevelopment from "@/public/Cirriculum_Development.png";
import SkillQualification from "@/public/skill_qualification.png";

const UseCasesSection = () => {
  return (
    <section>
      <h2>Here are Several Use Cases</h2>
      <span>
        {" "}
        Use HydraNode in various ways to develop yourself. From students to
        working professionals, anyone can get benefited by our platform.{" "}
      </span>

      <div>
        <div>
          <h2>Skill Development</h2>
          <span>
            Access real-time learning solutions for upskilling or reskilling,
            including IT certifications, new software tools, and job-specific
            practical environments.
          </span>
        </div>
        <div>
          <h2>Interactive Study Groups</h2>
          <span>
            Form AI-moderated study groups that enhance collaboration and
            provide personalized insights and resources based on group dynamics
            and individual contributions
          </span>
          <Image src={InteractiveStudyGroup} alt="study group" />
        </div>
        <div>
          <Image src={CirriculumDevelopment} alt="study group" />
          <h2>Cirriculum Development</h2>
          <span>
            Use AI to assist in developing and updating curricula, ensuring they
            meet current industry standards and future trends.
          </span>
        </div>
        <div>
          <h2>Mentorship Matching</h2>
          <span>
            AI-driven matching of professionals with mentors in their field,
            fostering growth through personalized guidance and support.
          </span>
        </div>
        <div>
          <h2>Partnerships</h2>
          <span>
            Empower existing e-learning platforms with advanced AI and
            blockchain integration to enhance learning experiences.
          </span>
        </div>
        <div>
          <h2>Skill Competitions</h2>
          <span>
            Participate in AI-driven skill competitions to test and showcase
            abilities, earning badges and recognitions that can be added to
            digital portfolios.
          </span>
          <Image src={SkillQualification} alt="study group" />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
