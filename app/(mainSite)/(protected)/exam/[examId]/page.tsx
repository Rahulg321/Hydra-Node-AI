import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import {
  checkIfUserHasAccessToExam,
  checkIfUserHasTrialAccess,
} from "@/hooks/lib/utils";
import { MultiStepExamDialog } from "@/components/Dialogs/MultiStepExamDialog";
import ExamCheckoutDialog from "@/components/ExamCheckoutDialog";
import StartTrialExamDialog from "@/components/Dialogs/start-trial-exam-dialog";
import RefreshCourseButton from "@/components/WebButtons/RefreshCourseButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamPricingCard } from "./ExamPricingCard";
import { ExamDetails } from "./ExamDetails";
import { ExamInstructions } from "./ExamInstructions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { getAllSystemVendors } from "@/prisma/queries";
import VendorsSheet from "@/components/Sheets/VendorsSheet";
import VendorButton from "../../vendors/VendorButton";

const getCachedExamInfo = unstable_cache(
  async (examId: string) => {
    return await db.exam.findUnique({
      where: { id: examId },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stripePriceId: true,
        description: true,
        timeAllowed: true,
        examLevel: true,
        questionsToShow: true,
        questions: {
          select: {
            id: true,
          },
        },
      },
    });
  },
  ["exam"],
  { revalidate: 3600, tags: ["exam"] },
);

export async function generateMetadata(props: {
  params: Promise<{ examId: string }>;
}) {
  const params = await props.params;
  const exam = await getCachedExamInfo(params.examId);

  return { title: exam?.name, description: exam?.description };
}

export default async function ExamPage(props: {
  params: Promise<{ examId: string }>;
}) {
  const params = await props.params;
  const examId = params.examId;
  const session = await auth();
  if (!session) return redirect("/login");
  const examPromise = getCachedExamInfo(examId);

  const [exam, vendors] = await Promise.all([
    examPromise,
    getAllSystemVendors(),
  ]);

  if (!exam)
    return (
      <section className="block-space big-container">
        <h2>Could not find Exam you were looking for</h2>
        <p>Please try again later</p>
        <Button asChild>
          <Link href="/vendors">Go Back</Link>
        </Button>
      </section>
    );

  const { hasAccess } = await checkIfUserHasAccessToExam(
    session.user.id as string,
    exam.id,
  );

  console.log("user has access", { hasAccess });

  return (
    <div>
      <VendorsSheet vendors={vendors} />
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 border-r border-border/40 dark:border-border md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-6 lg:py-8">
            <div className="w-full px-2">
              <h4 className="ml-2">Vendors</h4>
              <div className="mt-6 grid grid-cols-2 gap-2 gap-y-4">
                {vendors.map((vendor) => (
                  <VendorButton key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="block-space-mini container">
          <div>
            <span>Certification Details</span>
            <h1 className="transducer-font mt-4 leading-relaxed tracking-wide">
              {exam.name}
            </h1>
          </div>
          <div className="mt-4 grid gap-6 md:mt-6 lg:mt-12 lg:grid-cols-2">
            <div className="space-y-6">
              <ExamDetails
                name={exam.name}
                examLevel={exam.examLevel}
                examId={exam.id}
                examName={exam.name}
                userId={session.user.id as string}
                examSlug={exam.slug}
                questionsToShow={exam.questionsToShow}
                timeAllowed={exam.timeAllowed}
                examPrice={exam.price}
                stripePriceId={exam.stripePriceId!}
                session={session}
                questionLength={exam.questions.length}
                hasAccess={hasAccess}
              />
              <Card className="border-none">
                <CardHeader>
                  <CardTitle className="transducer-font uppercase tracking-wide">
                    Exam Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#878593] md:text-lg">
                    {exam.description}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <ExamInstructions />
              <Card className="border-none">
                <CardHeader>
                  <h4 className="transducer-font uppercase tracking-wide">
                    Don&apos;t See Your Purchased Exam?
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-[#878593] md:text-lg">
                    If your purchased exam isn&apos;t appearing, try refreshing
                    the page or clearing your browser cache. Still having
                    trouble? Feel free to contact our support team for further
                    assistance.
                  </p>
                  <RefreshCourseButton />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
