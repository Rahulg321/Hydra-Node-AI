import React, { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExamEditor from "./exam-editor";
import db from "@/lib/db";

const ManageBasicsPage = async ({
  params,
}: {
  params: {
    uid: string;
  };
}) => {
  const session = await auth();
  const examId = params.uid;

  if (!session) {
    return redirect("/login");
  }

  return (
    <section>
      <Suspense
        fallback={
          <div>
            <h2>Loading...</h2>
          </div>
        }
      >
        <ExamEditor examId={examId} />
      </Suspense>
    </section>
  );
};

export default ManageBasicsPage;
