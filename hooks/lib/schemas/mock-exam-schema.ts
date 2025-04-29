import { z } from "zod";
import { ExamModeValues } from "../exam-mode-context";

// Define the schema for the mock exam form
export const MockExamFormSchema = z.object({
  totalTime: z
    .number()
    .min(1, { message: "Total time must be at least 1 minute" }),
  examMode: z.enum([ExamModeValues.MOCK, ExamModeValues.PRACTICE]),
});

// Define the TypeScript type for the mock exam form data
export type MockExamZodType = z.infer<typeof MockExamFormSchema>;
