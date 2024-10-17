import { z } from "zod";

// Define the schema for the login form
export const EditProfileFormSchema = z.object({
  firstName: z.string({ message: "first name is required" }).min(3).max(20),
  lastName: z.string({ message: "last name is required" }).min(3).max(20),
});

// Define the TypeScript type for the login form data
export type EditProfileFormZodType = z.infer<typeof EditProfileFormSchema>;
