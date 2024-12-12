import * as z from "zod";

export const createExamSchema = z.object({
  name: z
    .string()
    .min(1, "Exam name is required")
    .max(100, "Exam name must be 100 characters or less"),
  description: z.string(),
  price: z.coerce.number().min(1, {
    message: "Minimum price must be one and should be a positive number",
  }),
  timeAllowed: z.coerce.number().min(10, {
    message: "Minimum 10 minutes time allowed for giving an exam",
  }),
  category: z.enum(
    ["mathematics", "science", "history", "language", "computer-science"],
    {
      required_error: "Please select a category",
    },
  ),

  examLevel: z.enum(["ASSOCIATE", "PROFESSIONAL", "EXPERT"], {
    required_error: "Please select a level for this exam",
  }),
});

export type CreateExamFormType = z.infer<typeof createExamSchema>;
