import QuestionDetailSkeleton from "@/components/skeletons/question-detail-skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="block-space container">
      <h2>Loading...</h2>
      <QuestionDetailSkeleton />
    </div>
  );
};

export default loading;
