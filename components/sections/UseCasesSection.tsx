import Image from "next/image";
import React from "react";
import InteractiveStudyGroup from "@/public/interactive_study_group.png";
import CirriculumDevelopment from "@/public/Cirriculum_Development.png";
import SkillQualification from "@/public/skill_qualification.png";

const UseCasesSection = () => {
  return (
    <section className="block-space big-container">
      <div className="mb-4 text-center md:mb-8 lg:mb-14">
        <h2>
          Here are Several{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Use Cases
          </span>
        </h2>
        <p>
          {" "}
          Use HydraNode in various ways to develop yourself. From students to{" "}
          <br />
          working professionals, anyone can get benefited by our platform.{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="col-span-2 rounded-xl bg-base p-4">
          <h2 className="mb-2 text-white">Skill Development</h2>
          <span className="text-white">
            Access real-time learning solutions for upskilling or reskilling,
            including IT certifications, new software tools, and job-specific
            practical environments.
          </span>
        </div>
        <div className="col-span-3 flex rounded-xl bg-[#F4F2FF] p-4">
          <div>
            <h2 className="text-baseC mb-2">Interactive Study Groups</h2>
            <span className="text-baseC">
              Form AI-moderated study groups that enhance collaboration and
              provide personalized insights and resources based on group
              dynamics and individual contributions
            </span>
          </div>
          <Image
            src={InteractiveStudyGroup}
            height={300}
            width={200}
            alt="study group "
            className=""
          />
        </div>
        <div className="col-span-3 flex rounded-xl bg-[#F4F2FF] p-4">
          <Image
            src={CirriculumDevelopment}
            alt="study group"
            height={300}
            width={200}
          />
          <div>
            <h2 className="text-baseC mb-2">Cirriculum Development</h2>
            <span className="text-baseC">
              Use AI to assist in developing and updating curricula, ensuring
              they meet current industry standards and future trends.
            </span>
          </div>
        </div>
        <div className="col-span-2 rounded-xl bg-base p-4 text-white">
          <h2>Mentorship Matching</h2>
          <span>
            AI-driven matching of professionals with mentors in their field,
            fostering growth through personalized guidance and support.
          </span>
        </div>
        <div className="col-span-2 rounded-xl bg-base p-4 text-white">
          <h2>Partnerships</h2>
          <span>
            Empower existing e-learning platforms with advanced AI and
            blockchain integration to enhance learning experiences.
          </span>
        </div>
        <div className="col-span-3 flex rounded-xl bg-[#F4F2FF] p-4">
          <div>
            <h2 className="text-baseC mb-2">Skill Competitions</h2>
            <span className="text-baseC">
              Participate in AI-driven skill competitions to test and showcase
              abilities, earning badges and recognitions that can be added to
              digital portfolios.
            </span>
          </div>
          <Image
            src={SkillQualification}
            alt="study group"
            height={300}
            width={200}
          />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

function GridContainer({
  heading,
  content,
}: {
  classname?: string;
  heading: string;
  content: string;
}) {
  return (
    <div className="rounded-xl bg-base p-2 even:bg-[#F4F2FF]">
      <h2 className="even:text-basee">{heading}</h2>
      <p>{content}</p>
    </div>
  );
}
