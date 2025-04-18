import { Loader2 } from "lucide-react";
import React from "react";

const ExamAnalysingScreen = () => {
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
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    </div>
  );
};

export default ExamAnalysingScreen;
