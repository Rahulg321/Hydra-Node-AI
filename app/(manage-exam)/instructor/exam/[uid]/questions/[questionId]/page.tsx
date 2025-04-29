import EditQuestionForm from "@/components/forms/edit-question-form";
import HtmlContent from "@/components/html-content";
import db from "@/hooks/lib/db";
import React from "react";
import DeleteQuestionButton from "./delete-question-button";

const SpecificQuestionPage = async (props: {
  params: Promise<{
    uid: string;
    questionId: string;
  }>;
}) => {
  const params = await props.params;
  const examId = params.uid;
  const questionId = params.questionId;
  const SpecificQuestion = await db.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!SpecificQuestion) {
    return (
      <div>
        <h2>Could not find Question</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  const { id, question } = SpecificQuestion;

  return (
    <section className="block-space narrow-container">
      <div className="mb-8 space-y-4">
        <h2>Edit Question</h2>
        <HtmlContent content={question} />
      </div>
      <div>
        <DeleteQuestionButton examId={examId} questionId={questionId} />
      </div>
      <div>
        <EditQuestionForm SingleQuestion={SpecificQuestion} examId={examId} />
      </div>
    </section>
  );
};

export default SpecificQuestionPage;
