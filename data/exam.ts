import db from "@/lib/db";

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
