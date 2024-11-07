import { z } from "zod";

// Define the schema for the login form
export const EditProfileFormSchema = z.object({
  name: z
    .string({ message: "first name is required" })
    .min(3)
    .max(20)
    .optional(),

  email: z.string().email({ message: "Invalid email address" }).optional(),
});
// Define the TypeScript type for the login form data
export type EditProfileFormZodType = z.infer<typeof EditProfileFormSchema>;
