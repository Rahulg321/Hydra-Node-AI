import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ExamAnalysingScreen = ({
  examId,
  quizSessionId,
}: {
  examId: string;
  quizSessionId: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    // Set a timeout to redirect after 2-4 seconds
    const redirectTimeout = setTimeout(
      () => {
        router.push(`/exam/${examId}/quiz/${quizSessionId}/results`);
      },
      Math.floor(Math.random() * 2000) + 2000,
    ); // Random time between 2-4 seconds

    // Clean up the timeout if component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [examId, quizSessionId, router]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="transducer-font uppercase tracking-wide">
        Analyzing your performance
      </h1>
      <p className="mt-4 text-white/70 md:mt-6">
        Your exam results are being crafted. Sit tight for a detailed insights
        into your performance.
      </p>
      <div className="mt-4 md:mt-6">
        <Loader2 className="size-14 animate-spin text-orange-500" />
      </div>
    </div>
  );
};

export default ExamAnalysingScreen;
