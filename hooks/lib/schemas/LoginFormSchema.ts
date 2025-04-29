import { z } from "zod";

// Define the schema for the login form
export const LoginFormZodType = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
  code: z.optional(z.string()),
});

// Define the TypeScript type for the login form data
export type LoginFormSchema = z.infer<typeof LoginFormZodType>;
