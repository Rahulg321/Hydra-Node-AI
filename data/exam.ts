import db from "@/lib/db";
import { ExamLevel } from "@prisma/client";

export async function getAllExams() {
  try {
    const exams = await db.exam.findMany();
    return exams;
  } catch (error) {
    console.log(
      "an error occured while trying to fetch all exams from the vendor",
      error,
    );
  }
}

export async function getAllExamsWithVendorIdExamLevel(vendorId:string, examLevel:ExamLevel){
    try {
        const allExams = await db.exam.findMany({
            where: {
              vendorId,
              examLevel: examLevel,
            },
            select: {
              id: true,
              name: true,
            },
          });

          return allExams
    } catch (error) {
        console.log(
            "an error occured while trying to fetch all exams from the vendor",
            error,
          );
    }
}


export async function getExamWithSlug(slug: string) {
  try {
    const exam = await db.exam.findFirst({
      where: {
        slug: slug,
      },
    });

    return exam;
  } catch (error) {
    console.log("an error occured while trying to fetch an exam", error);
  }
}
