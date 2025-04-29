import { z } from "zod";

// Define the schema for the contact form
export const SocialInfoFormSchema = z.object({
  linkedinLink: z
    .string()
    .min(1, { message: "Linkedin is required" })
    .optional(),
  twitterLink: z.string().min(1, { message: "Twitter is required" }).optional(),
});

// Define the TypeScript type for the contact form data
export type SocialInfoFormSchemaZodType = z.infer<typeof SocialInfoFormSchema>;
