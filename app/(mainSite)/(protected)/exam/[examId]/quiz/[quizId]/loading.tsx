import { Loader2 } from "lucide-react";

export default function QuizLoadingScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center space-y-12 p-4 text-center text-gray-400">
      <h1 className="transducer-font text-4xl font-bold uppercase tracking-wider md:text-5xl">
        STARTING YOUR MOCK EXAM
      </h1>

      <p className="mx-auto max-w-md text-sm text-gray-500">
        Your exam results are being crafted. Sit tight for a detailed insights
        into your performance.
      </p>
      <div className="">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    </div>
  );
}
