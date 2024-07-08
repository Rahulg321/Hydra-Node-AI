import { z } from "zod";

export const SignUpFormZodType = z.object({
  email: z.string().min(2).max(50),
});

export type SignUpFormSchema = z.infer<typeof SignUpFormZodType>;
