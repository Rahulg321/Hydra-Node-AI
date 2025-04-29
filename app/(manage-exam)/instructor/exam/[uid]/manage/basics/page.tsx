import React, { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExamEditor from "./exam-editor";
import db from "@/hooks/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Exam",
  description: "",
};

const ManageBasicsPage = async (props: {
  params: Promise<{
    uid: string;
  }>;
}) => {
  const params = await props.params;
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
