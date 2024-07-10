import { z } from "zod";

// Define the schema for the sign-up form
export const SignUpFormZodType = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name cannot exceed 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

// Define the TypeScript type for the sign-up form data
export type SignUpFormSchema = z.infer<typeof SignUpFormZodType>;
