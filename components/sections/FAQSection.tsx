import React from "react";
import FaqCard from "../FaqCard";

const FAQSection = () => {
  return (
    <section className="block-space big-container">
      <div className="mb-4 text-center lg:mb-12">
        <h2>
          Frequently Asked{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p>
          Below you&apos;ll find answers to the questions we get <br /> asked
          the most about HydraNode
        </p>
      </div>
      <div className="space-y-2">
        <FaqCard
          heading="What is HydraNode?"
          tagline="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto laborum nam hic magnam officiis incidunt quo molestiae, voluptates commodi ut labore aperiam quas reprehenderit. Nam sapiente laboriosam ducimus quaerat."
        />
        <FaqCard
          heading="What problem does HydraNode solve?"
          tagline="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto laborum nam hic magnam officiis incidunt quo molestiae, voluptates commodi ut labore aperiam quas reprehenderit. Nam sapiente laboriosam ducimus quaerat."
        />
        <FaqCard
          heading="What is the HYD token?"
          tagline="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto laborum nam hic magnam officiis incidunt quo molestiae, voluptates commodi ut labore aperiam quas reprehenderit. Nam sapiente laboriosam ducimus quaerat."
        />
        <FaqCard
          heading="How do certification rewards work?"
          tagline="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto laborum nam hic magnam officiis incidunt quo molestiae, voluptates commodi ut labore aperiam quas reprehenderit. Nam sapiente laboriosam ducimus quaerat."
        />
        <FaqCard
          heading="How does Hydranode ensure the security of its platform?"
          tagline="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto laborum nam hic magnam officiis incidunt quo molestiae, voluptates commodi ut labore aperiam quas reprehenderit. Nam sapiente laboriosam ducimus quaerat."
        />
      </div>
    </section>
  );
};

export default FAQSection;
