import { z } from "zod";

// Define the schema for the login form
export const EditProfileFormSchema = z
  .object({
    name: z
      .string({ message: "first name is required" })
      .min(3)
      .max(20)
      .optional(),

    email: z.string().email({ message: "Invalid email address" }).optional(),
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
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .optional(),

    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Only require `newPassword` if `password` is provided and vice versa
      return (
        (!data.password && !data.newPassword) ||
        (data.password && data.newPassword)
      );
    },
    {
      message: "Both password and new password are required if one is provided",
      path: ["newPassword"], // This will display the error on the newPassword field
    },
  );
// Define the TypeScript type for the login form data
export type EditProfileFormZodType = z.infer<typeof EditProfileFormSchema>;
