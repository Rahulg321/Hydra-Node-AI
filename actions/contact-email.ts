"use server";

import { sendContactFormEmail } from "@/lib/mail";
import { ContactFormSchemaZodType } from "@/lib/schemas/ContactFormSchema";

export default async function submitContactForm(
  values: ContactFormSchemaZodType,
) {
  try {
    console.log("Values", values);
    const emailResponse = await sendContactFormEmail(
      values.email,
      values.firstName,
      values.lastName,
      values.message,
    );

    if (emailResponse?.error) {
      return {
        status: false,
        message: emailResponse?.error,
      };
    }

    return {
      status: true,
      message: "Email Sent!! Your query has been recorded",
    };
  } catch (error) {
    console.log("an error occured while trying to submit contact form");
    return {
      status: false,
      message: "",
    };
  }
}
