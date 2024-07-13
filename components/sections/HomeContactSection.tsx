import React from "react";
import ContactUsForm from "@/components/forms/ContactUsForm";

const HomeContactSection = () => {
  return (
    <section className="block-space-large bg-[#040011] text-white">
      <div className="container">
        <div className="grid grid-cols-2">
          <div className="content-center space-y-2">
            <span className="font-bold tracking-wide text-yellow-400">
              HELP DESK
            </span>
            <h2>
              Contact us if you have any <br /> enquiry regarding{" "}
              <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
                HydraNode
              </span>
            </h2>
            <p className="text-white/80">
              Share your email address along with the enquiry.
              <br /> We will reach out soon.
            </p>
          </div>
          <div className="container">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
