import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiDivideBold } from "react-icons/pi";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Quiz from "./MCQ";
import MCQ from "./MCQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCQ",
  description: "MCQ",
};

const page = async ({
  params,
}: {
  params: {
    examSlug: string;
    quizId: string;
  };
}) => {
  // based on the quiz session started, fetch the exam and its related questions
  const quiz = await db.quizSession.findFirst({
    where: {
      id: params.quizId,
    },
    include: {
      exam: {
        include: {
          questions: {
            select: {
              id: true,
              question: true,
              options: true,
            },
          },
        },
      },
    },
  });

  if (!quiz) {
    console.log("the quiz was not created");
    return redirect("/vendors");
  }

  if (quiz.isCompleted) {
    return redirect(`/exam/${quiz.exam.slug}/quiz/${quiz.id}/results`);
  }

  console.log("returned quiz is", quiz);

  return <MCQ quiz={quiz} />;
};

export default page;
