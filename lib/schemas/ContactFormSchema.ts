import { z } from "zod";

// Define the schema for the contact form
export const ContactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
});

// Define the TypeScript type for the contact form data
export type ContactFormSchemaZodType = z.infer<typeof ContactFormSchema>;
