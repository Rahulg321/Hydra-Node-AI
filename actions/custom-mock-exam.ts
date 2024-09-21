"use server";

import { MockExamZodType } from "@/lib/schemas/mock-exam-schema";

export default async function CreateCustomMockExam(formData: MockExamZodType) {
  console.log("formData", formData);
}
