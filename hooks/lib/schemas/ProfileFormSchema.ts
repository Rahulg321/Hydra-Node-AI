import { z } from "zod";

// Define the schema for the login form
export const ProfileFormSchema = z.object({
  name: z.string({ message: "name is required" }).min(3).max(20),
  password: z.string(),
});

// Define the TypeScript type for the login form data
export type ProfileFormZodType = z.infer<typeof ProfileFormSchema>;
