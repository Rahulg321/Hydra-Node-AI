import { z } from "zod";

// Define the schema for the login form
export const ResetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// Define the TypeScript type for the login form data
export type ResetPasswordFormZodType = z.infer<typeof ResetPasswordFormSchema>;
