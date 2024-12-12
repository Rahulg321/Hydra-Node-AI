import { BulkImportDialog } from "@/components/Dialogs/bulk-import-dialog";
import BulkUploadQuestionsDialog from "@/components/Dialogs/bulk-upload-questions-dialog";
import AddNewQuestionForm from "@/components/forms/new-question-form";
import React from "react";

const NewQuestionPage = ({
  params,
}: {
  params: {
    uid: string;
  };
}) => {
  const examId = params.uid;

  return (
    <section className="block-space narrow-container">
      <div className="mb-4 flex items-center justify-between">
        <h2>Add a New Question</h2>
        <BulkImportDialog examId={examId} />
      </div>
      <AddNewQuestionForm examId={examId} />
    </section>
  );
};

export default NewQuestionPage;
