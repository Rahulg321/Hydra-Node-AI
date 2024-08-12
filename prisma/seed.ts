import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// docker command to run a postgres container
// docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres

async function main() {
  // Exam Types
  // const examTypes = [
  //   { name: "Amazon Exams", slug: "amazon-exams" },
  //   { name: "APICS Exams", slug: "apics-exams" },
  //   { name: "CheckPoint Exams", slug: "checkpoint-exams" },
  //   { name: "Cisco Exams", slug: "cisco-exams" },
  //   { name: "Citrix Exams", slug: "citrix-exams" },
  //   { name: "Dell Exams", slug: "dell-exams" },
  //   { name: "Fortinet Exams", slug: "fortinet-exams" },
  //   { name: "Google Exams", slug: "google-exams" },
  //   { name: "Ilet Exams", slug: "ilet-exams" },
  //   { name: "IAPP Exams", slug: "iapp-exams" },
  //   { name: "IBM Exams", slug: "ibm-exams" },
  //   { name: "Java Exams", slug: "java-exams" },
  //   { name: "Juniper Exams", slug: "juniper-exams" },
  // ];

  // // Insert Exam Types
  // for (const type of examTypes) {
  //   await prisma.examType.upsert({
  //     where: { slug: type.slug },
  //     update: {},
  //     create: type,
  //   });
  // }

  // // Exam Levels
  // const examLevels = [
  //   { name: "Associate Level", slug: "associate-level" },
  //   { name: "Professional Level", slug: "professional-level" },
  //   { name: "Expert Level", slug: "expert-level" },
  // ];

  // // Insert Exam Levels
  // for (const level of examLevels) {
  //   await prisma.examLevel.upsert({
  //     where: { slug: level.slug },
  //     update: {},
  //     create: level,
  //   });
  // }

  // Google Exams at Professional Level
  //   const googleExamType = await prisma.examType.findUnique({
  //     where: { slug: "google-exams" },
  //   });

  //   const professionalLevel = await prisma.examLevel.findUnique({
  //     where: { slug: "professional-level" },
  //   });

  const googleExams = [
    { name: "GSuite", slug: "gsuite" },
    { name: "Cloud-Digital-Leader-JPN", slug: "cloud-digital-leader-jpn" },
    { name: "Google-Apps-Calendar", slug: "google-apps-calendar" },
    {
      name: "Google-Workspace-Administrator",
      slug: "google-workspace-administrator",
    },
  ];

  // Insert Google Exams
  for (const exam of googleExams) {
    await prisma.exam.upsert({
      where: { slug: exam.slug },
      update: {},
      create: {
        name: exam.name,
        slug: exam.slug,
        examTypeId: "clyzik9gx0007ljbsd39uir2l",
        examLevelId: "clyzik9ke000eljbsoi7rc66r",
      },
    });
  }

  console.log("Seed data has been added successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
