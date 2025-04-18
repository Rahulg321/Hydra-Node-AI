"use server";

import { sendContactFormEmail } from "@/lib/mail";
import { ContactFormSchemaZodType } from "@/lib/schemas/ContactFormSchema";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

export async function submitContactForm(values: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  const ip =
    (await headers()).get("x-real-ip") ||
    (await headers()).get("x-forwarded-for");

  const {
    remaining,
    limit,
    success: limitReached,
  } = await rateLimit.limit(ip!);

  console.log({ remaining, limit, limitReached });

  if (!limitReached) {
    return {
      status: false,
      message:
        "You have reached the limit of contact form submissions. Please try again later after 2 minutes",
    };
  }

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
