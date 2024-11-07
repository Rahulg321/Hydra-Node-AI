import { z } from "zod";

// Define the schema for the login form
export const EditProfileFormSchema = z
  .object({
    name: z.optional(
      z.string({ message: "first name is required" }).min(3).max(20),
    ),
    email: z.optional(z.string().email({ message: "Invalid email address" })),
    password: z.optional(
      z
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
        }),
    ),
    newPassword: z.optional(
      z
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
        }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Both password and new password are required",
    },
  );

// Define the TypeScript type for the login form data
export type EditProfileFormZodType = z.infer<typeof EditProfileFormSchema>;
