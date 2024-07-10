import { z } from "zod";

// Define the schema for the contact form
export const ContactFormZodType = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
});

// Define the TypeScript type for the contact form data
export type ContactFormSchema = z.infer<typeof ContactFormZodType>;
