import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import { Button } from "@/components/ui/button";
import {
  checkIfUserHasAccessToExam,
  checkIfUserHasTrialAccess,
  cn,
} from "@/lib/utils";
import React from "react";
import { FaStar } from "react-icons/fa6";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import StartExamDialog from "@/components/Dialogs/start-exam-dialog";
import ExamCheckoutDialog from "@/components/ExamCheckoutDialog";
import { getAllExams, getExamWithSlug } from "@/data/exam";
import { MultiStepExamDialog } from "@/components/Dialogs/MultiStepExamDialog";
import StartTrialExamDialog from "@/components/Dialogs/start-trial-exam-dialog";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  let exams = await getAllExams();

  return exams!.map((e) => ({
    examSlug: e.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { examSlug: string };
}) {
  let post = await getExamWithSlug(params.examSlug);

  return {
    title: post!.name,
    description: post!.description,
  };
}

const ExamPage = async ({
  params,
  searchParams,
}: {
  params: {
    examSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const loggedInUser = await auth();

  if (!loggedInUser) {
    console.log("user is not logged in");
    return redirect("/login");
  }

  const exam = await db.exam.findFirst({
    where: {
      slug: params.examSlug,
    },
    include: {
      questions: true,
    },
  });

  if (!exam) {
    console.log("could not find exam");
    return notFound();
  }
  const { hasAccess, message } = await checkIfUserHasAccessToExam(
    loggedInUser.user.id as string,
    exam.id,
  );

  if (hasAccess) {
    console.log("user has access");
  } else {
    console.log("user does not have access");
  }

  const hasTrialAccess = await checkIfUserHasTrialAccess(
    loggedInUser.user.id as string,
  );

  console.log("user has trial access", hasTrialAccess);

  return (
    <section className="block-space-large">
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-4">{exam.name}</h2>
          <span className="block font-bold underline">Certificate Details</span>
          <span className="block font-bold text-muted-foreground">
            Total Question Bank:{" "}
            <span className="text-baseC">{exam.questions.length}</span>
          </span>

          <span className="block font-bold text-muted-foreground">
            Question in Exam:{" "}
            <span className="text-baseC">{exam.questionsToShow}</span>
          </span>
          <span className="block font-bold text-muted-foreground">
            Attempt: <span className="text-baseC">{exam.attempts}</span>
          </span>
          <span className="block font-bold text-muted-foreground">
            Exam Time:{" "}
            <span className="text-baseC">{exam.timeAllowed} minutes</span>
          </span>
          <span className="block font-bold text-muted-foreground">
            Exam Level: <span className="text-baseC">{exam.examLevel}</span>
          </span>
          <div className="my-4 flex items-center gap-1">
            <div className="flex gap-1 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span>4.8 (23 reviews)</span>
          </div>
          {/* logged in user may or may not exist, should check for null or better code */}
          {hasAccess ? (
            <div>
              <h3>Exam Purchased!!!!</h3>
              <MultiStepExamDialog
                examId={exam.id}
                examSlug={exam.slug}
                currentUserId={loggedInUser.user.id as string}
                examTime={exam.timeAllowed}
                examLevel={exam.examLevel}
                examName={exam.name}
              />
              {/* <StartExamDialog
                examId={exam.id}
                examSlug={exam.slug}
                currentUserId={loggedInUser.user.id as string}
                examTime={exam.timeAllowed}
              /> */}
            </div>
          ) : (
            <ExamCheckoutDialog exam={exam} session={loggedInUser} />
          )}

          {hasTrialAccess.status && !hasAccess ? (
            <div className="mt-4 md:mt-6">
              <h3 className="mb-2">You have trial access to this exam</h3>
              <StartTrialExamDialog
                examId={exam.id}
                examSlug={exam.slug}
                userId={loggedInUser.user.id as string}
                examTime={exam.timeAllowed}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="my-4">
            <span className="block text-lg font-bold">Exam Description</span>
            <span className="block text-lg font-semibold text-mutedText">
              {exam.description}
            </span>
          </div>
          <h4>Examination Instructions</h4>
          <ul className="list-inside list-disc px-2 py-4 text-lg font-semibold text-mutedText">
            <li>You can pause the test at any time and resume later.</li>
            <li>
              You can retake the test as many times as you would like. The
              progress bar at the top of the screen will show your progress as
              well as the time remaining in the test. If you run out of time,
              don’t worry; you will still be able to finish the test.
            </li>
            <li>
              You can skip a question to come back to at the end of the exam.
            </li>
            <li>
              You can also use “Mark for review” to come back to questions you
              are unsure about before you submit your test.
            </li>
            <li>
              If you want to finish the test and see your results immediately,
              press the stop button.
            </li>
          </ul>
        </div>
        {hasAccess ? (
          <div
            className="rounded-md border-l-4 border-green-500 bg-green-100 p-4 text-green-700 shadow-md"
            role="alert"
          >
            <p className="text-xl font-bold">
              Exam Purchased! <span className="ml-2">🎉</span>
            </p>
            <p className="text-lg">You have access to this exam.</p>
            <div>
              <p>{exam.description}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PricingCard
              heading="For 1 year"
              headingTag="Yearly Billing"
              tagline="Perfect for committed learners and professionals aiming for continuous growth and development."
              price="$100"
              isFeatured
              duration="year"
            />
            <PricingCard
              heading="For Life time"
              headingTag="Lifetime Billing"
              tagline="Gain unlimited access to HydraNode’s platform and resources for life."
              price="$200"
              duration="week"
            />
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExamPage;

function PricingCard({
  classname,
  price,
  duration,
  tagline,
  heading,
  isFeatured = false,
  headingTag,
}: {
  classname?: string;
  price: string;
  duration: string;
  tagline: string;
  heading: string;
  headingTag: string;
  isFeatured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-fit flex-col justify-between gap-4 rounded-lg border p-4",
        classname,
        {
          "bg-base": isFeatured,
        },
      )}
    >
      <span
        className={cn("block font-semibold text-mutedText", {
          "text-[#D9DBE9]": isFeatured,
        })}
      >
        {headingTag}
      </span>
      <div>
        <h4
          className={cn("mb-2 text-base", {
            "text-white": isFeatured,
          })}
        >
          {heading}
        </h4>

        <h4
          className={cn("flex items-center gap-1", {
            "my-4 text-white": isFeatured,
          })}
        >
          {price}/{duration}
        </h4>
      </div>
      <Button
        className={cn("mb-4 rounded-full bg-base p-6 text-lg font-bold", {
          "bg-white text-baseC": isFeatured,
        })}
      >
        Learn More
      </Button>
    </div>
  );
}
