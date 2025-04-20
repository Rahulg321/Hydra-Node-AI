import { Loader2 } from "lucide-react";

export default function QuizLoadingScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center space-y-12 p-4 text-center">
      <h1 className="transducer-font bg-gradient-to-r from-white to-transparent bg-clip-text font-bold uppercase tracking-wider">
        STARTING YOUR EXAM
      </h1>

      <p className="mx-auto max-w-xl">
        Your exam results are being crafted. Sit tight for a detailed insights
        into your performance.
      </p>
      <div className="">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    </div>
  );
}
