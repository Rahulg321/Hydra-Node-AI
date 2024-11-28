import React from "react";
import ContactForm from "./contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us!",
  description: "Contact us for any queries",
};

const ContactPage = async () => {
  return (
    <div>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
