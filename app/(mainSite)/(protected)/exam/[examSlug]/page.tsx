import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import RedMedal from "@/public/RedMedal.png";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import StartExamButton from "./StartExamButton";
import { auth } from "@/auth";

const page = async ({
  params,
}: {
  params: {
    examSlug: string;
  };
}) => {
  const loggedInUser = await auth();

  if (!loggedInUser) {
    console.log("user is not logged in");
    return redirect("/login");
  }

  // const existingUser = await db.user.findUnique({
  //   where: {
  //     id: loggedInUser.user.id,
  //   },
  // });

  // if (!existingUser) {
  //   console.log("could not find an user in the database");
  //   return redirect("/login");
  // }

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

  return (
    <section className="block-space-large">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 block w-fit rounded-md border-4 p-2">
          <h5 className="font-bold">Certification EXAM</h5>
        </div>
        <h1 className="">{exam.name}</h1>
      </div>

      <div className="container grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <span className="block font-bold">Certificate Details</span>
          <span className="block font-bold text-muted-foreground">
            Number of questions:{" "}
            <span className="text-baseC">{exam.questions.length}</span>
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
          <StartExamButton
            examId={exam.id}
            examSlug={exam.slug}
            currentUserId={loggedInUser.user.id as string}
          />
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PricingCard
            heading="Free Trial"
            headingTag="For 7 days"
            tagline="Get a quick overview of our platform through the free trial and explore the potential of HydraNode."
            price="$0"
            duration="week"
          />
          <PricingCard
            heading="Quarterly Billing"
            headingTag="For 3 months"
            tagline="Ideal for those who prefer short-term commitments with comprehensive features."
            price="$50"
            duration="monthly"
          />
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
        </div>
      </div>
    </section>
  );
};

export default page;

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
        "flex flex-col justify-between gap-4 rounded-lg border p-4",
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
        <span
          className={cn("font-base text-mutedText", {
            "text-[#D9DBE9]": isFeatured,
          })}
        >
          {tagline}
        </span>

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
