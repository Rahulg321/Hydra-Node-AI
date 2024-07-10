import React from "react";
import ContactUsForm from "@/components/forms/ContactUsForm";

const HomeContactSection = () => {
  return (
    <section className="bg-[#040011] block-space text-white">
      <div className="big-container">
        <div className="grid grid-cols-2">
          <div>
            <span>HELP DESK</span>
            <h2>Contact us if you have any enquiry regarding HydraNode</h2>
            <span>
              Share your email address along with the enquiry. We will reach out
              soon.
            </span>
          </div>
          <div>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
