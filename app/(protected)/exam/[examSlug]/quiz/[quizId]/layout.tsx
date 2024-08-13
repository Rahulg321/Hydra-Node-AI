import React from "react";

import db from "@/lib/db";
import { notFound } from "next/navigation";

function TimeLeft() {
  return (
    <div className="rounded-lg bg-base p-4 text-center text-white">
      <h4>Time Left</h4>

      <h3>01:18:45</h3>
    </div>
  );
}

function CorrectQuestionGrid() {
  return (
    <div className="bg-muted p-4">
      <div className="grid grid-cols-6 gap-2">
        {
          // using array constructor map out 3 divs
          Array.from({ length: 42 }).map((_, index) => {
            return (
              <div
                key={index}
                className="size-8 rounded-lg border border-base"
              ></div>
            );
          })
        }
      </div>
    </div>
  );
}

const layout = async ({
  params,
  children,
}: {
  params: {
    examSlug: string;
    quizId: string;
  };
  children: React.ReactNode;
}) => {
  //   const quiz = await db.quizSession.findFirst({
  //     where: {
  //       id: params.quizId,
  //     },
  //     include: {
  //       exam: {
  //         include: {
  //           questions: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!quiz) {
  //     return notFound();
  //   }

  return (
    <section className="grid min-h-screen grid-cols-5">
      <div className="block-space container col-span-1">
        <TimeLeft />

        <CorrectQuestionGrid />
      </div>
      <div className="container col-span-4 space-y-4 bg-[#F5F4FA] py-4">
        {children}
      </div>
    </section>
  );
};

export default layout;
