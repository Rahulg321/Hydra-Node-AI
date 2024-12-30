import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import db from "@/lib/db";
import {
  checkIfUserHasAccessToExam,
  checkIfUserHasTrialAccess,
} from "@/lib/utils";
import { MultiStepExamDialog } from "@/components/Dialogs/MultiStepExamDialog";
import ExamCheckoutDialog from "@/components/ExamCheckoutDialog";
import StartTrialExamDialog from "@/components/Dialogs/start-trial-exam-dialog";
import RefreshCourseButton from "@/components/WebButtons/RefreshCourseButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExamPricingCard } from "./ExamPricingCard";
import { ExamDetails } from "./ExamDetails";
import { ExamInstructions } from "./ExamInstructions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateStaticParams() {
  const exams = await db.exam.findMany({
    select: {
      id: true,
    },
  });

  return exams.map((exam) => ({ examId: exam.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ examId: string }>;
}) {
  const params = await props.params;
  const exam = await db.exam.findUnique({
    where: { id: params.examId },
    select: {
      name: true,
      description: true,
    },
  });
  return { title: exam?.name, description: exam?.description };
}

export default async function ExamPage(props: {
  params: Promise<{ examId: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  if (!session) return redirect("/login");

  const exam = await db.exam.findUnique({
    where: { id: params.examId },
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

  const { status: hasTrialAccess } = await checkIfUserHasTrialAccess(
    session.user.id as string,
  );

  return (
    <section className="container py-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ExamDetails
            name={exam.name}
            examLevel={exam.examLevel}
            questions={exam.questions}
            questionsToShow={exam.questionsToShow}
            timeAllowed={exam.timeAllowed}
          />
          <Card>
            <CardHeader>
              <CardTitle>Exam Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{exam.description}</p>
            </CardContent>
          </Card>
          <ExamInstructions />
        </div>
        <div className="space-y-6">
          {hasAccess ? (
            <>
              <Alert variant="default">
                <AlertTitle>Exam Available! 🎉</AlertTitle>
                <AlertDescription>
                  You have access to this exam. Take it now to test your
                  knowledge.
                </AlertDescription>
              </Alert>
              <MultiStepExamDialog
                examId={exam.id}
                examSlug={exam.slug}
                currentUserId={session.user.id as string}
                examTime={exam.timeAllowed}
                examLevel={exam.examLevel}
                examName={exam.name}
                examLength={exam.questions.length}
                questionsToShow={exam.questionsToShow}
              />
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <ExamPricingCard
                  heading="For 1 year"
                  headingTag="Yearly Billing"
                  tagline="Perfect for committed learners and professionals aiming for continuous growth and development."
                  price="$100"
                  duration="year"
                  isFeatured
                />
                <ExamPricingCard
                  heading="For Life time"
                  headingTag="Lifetime Billing"
                  tagline="Gain unlimited access to HydraNode's platform and resources for life."
                  price="$200"
                  duration="week"
                />
              </div>
              <ExamCheckoutDialog
                id={exam.id}
                name={exam.name}
                price={exam.price}
                slug={exam.slug}
                stripePriceId={exam.stripePriceId!}
                session={session}
              />
              {hasTrialAccess && (
                <Card>
                  <CardHeader>
                    <CardTitle>Trial Access Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">You have trial access to this exam.</p>
                    <StartTrialExamDialog
                      examId={exam.id}
                      examSlug={exam.slug}
                      userId={session.user.id as string}
                      examTime={exam.timeAllowed}
                      examLength={exam.questions.length}
                    />
                  </CardContent>
                </Card>
              )}
            </>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Don&apos;t See Your Purchased Exam?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                If your purchased exam isn&apos;t appearing, try refreshing the
                page or clearing your browser cache. Still having trouble? Feel
                free to contact our support team for further assistance.
              </p>
              <RefreshCourseButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
