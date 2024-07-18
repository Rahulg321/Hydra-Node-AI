import SignupForm from "@/components/forms/SignupForm";
import React from "react";

const page = () => {
  return (
    <section className="block-space-large">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div></div>
        <div className="container">
          <h3>Sign Up For Hydranode Platform</h3>
          <SignupForm />
        </div>
      </div>
    </section>
  );
};

export default page;
