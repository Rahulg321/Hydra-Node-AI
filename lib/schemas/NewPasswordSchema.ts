import { z } from "zod";

// Define the schema for the login form
export const NewPasswordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

// Define the TypeScript type for the login form data
export type NewPasswordFormZodType = z.infer<typeof NewPasswordFormSchema>;
