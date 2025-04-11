import { z } from "zod";

// Define the schema for the contact form
export const AccountInfoFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

// Define the TypeScript type for the contact form data
export type AccountInfoFormSchemaZodType = z.infer<
  typeof AccountInfoFormSchema
>;
