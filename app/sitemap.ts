import getAllVendors from "@/data/vendor";

import db from "@/hooks/lib/db";
import { getAllExamsRoutes, getAllUserRoutes } from "@/prisma/queries";

export const baseUrl = "https://hydranode.ai";

const staticRoutes = [
  "/",
  "/pricing",
  "/about-us",
  "/reward",
  "/token",
  "/exam",
  "/vendors",
  "/login",
  "/signup",
  "/product",
  "/settings",
  "/marketplace",
  "/create",
  "/contact-us",
  "/community",
  "/community/blog",
  "/community/forum",
  "/community/leaderboards",
  "/community/resources",
  "/community/social",
  "/terms-of-service",
  "/privacy-policy",
  "/cookie-policy",
];

export default async function sitemap() {
  // Vendors
  const vendors = await getAllVendors();
  const vendorRoutes = vendors
    ? vendors.map((e) => ({
        url: `${baseUrl}/vendors/${e.slug}`,
        lastModified: e.updatedAt,
      }))
    : [];

  // Exams
  const exams = await getAllExamsRoutes();
  const examRoutes = exams
    ? exams.flatMap((exam) => [
        {
          url: `${baseUrl}/exam/${exam.id}`,
          lastModified: exam.updatedAt,
        },
      ])
    : [];

  // Quiz Sessions (for each exam, get all quiz sessions)
  let quizSessionRoutes = [];
  if (exams) {
    for (const exam of exams) {
      const quizSessions = await db.quizSession.findMany({
        where: { examId: exam.id },
        select: { id: true, updatedAt: true },
      });
      quizSessionRoutes.push(
        ...quizSessions.flatMap((quiz) => [
          {
            url: `${baseUrl}/exam/${exam.id}/quiz/${quiz.id}`,
            lastModified: quiz.updatedAt,
          },
          {
            url: `${baseUrl}/exam/${exam.id}/quiz/${quiz.id}/review`,
            lastModified: quiz.updatedAt,
          },
          {
            url: `${baseUrl}/exam/${exam.id}/quiz/${quiz.id}/results`,
            lastModified: quiz.updatedAt,
          },
        ]),
      );
    }
  }

  // Users (for profile routes)
  const users = await getAllUserRoutes();
  const userRoutes = users
    ? users.flatMap((user) => [
        {
          url: `${baseUrl}/profile/${user.id}`,
          lastModified: user.updatedAt,
        },
        {
          url: `${baseUrl}/profile/${user.id}/info`,
          lastModified: user.updatedAt,
        },
        {
          url: `${baseUrl}/profile/${user.id}/exam-history`,
          lastModified: user.updatedAt,
        },
        {
          url: `${baseUrl}/profile/${user.id}/learnings`,
          lastModified: user.updatedAt,
        },
        {
          url: `${baseUrl}/profile/${user.id}/subscription`,
          lastModified: user.updatedAt,
        },
      ])
    : [];

  // Static routes
  const staticRouteObjs = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...staticRouteObjs,
    ...vendorRoutes,
    ...examRoutes,
    ...quizSessionRoutes,
    ...userRoutes,
  ];
}
