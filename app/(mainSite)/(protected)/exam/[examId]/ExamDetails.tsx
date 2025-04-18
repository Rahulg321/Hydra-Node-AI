import { Exam } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamPricingCard } from "./ExamPricingCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MultiStepExamDialog } from "@/components/Dialogs/MultiStepExamDialog";
import ExamCheckoutDialog from "@/components/ExamCheckoutDialog";
import StartTrialExamDialog from "@/components/Dialogs/start-trial-exam-dialog";
import { Session } from "next-auth";

interface ExamDetailsProps {
  name: string;
  examId: string;
  examName: string;
  userId: string;
  examSlug: string;
  examLevel: string;
  questionsToShow: number;
  examPrice: number;
  questionLength: number;
  timeAllowed: number;
  stripePriceId: string;
  hasAccess: boolean;
  hasTrialAccess: boolean;
  session: Session;
}

export function ExamDetails({
  examLevel,
  examId,
  examName,
  userId,
  examSlug,
  questionsToShow,
  examPrice,
  questionLength,
  timeAllowed,
  hasAccess,
  hasTrialAccess,
  stripePriceId,
  session,
}: ExamDetailsProps) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="">
          <h2 className="transducer-font uppercase tracking-wide">
            Certification Details
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <dl className="grid grid-cols-2 gap-4">
          <DetailItem label="Range of Questions" value={`300-400`} />
          <DetailItem
            label="Mock Exam Questions"
            value={questionsToShow.toString()}
          />
          <DetailItem label="Time Duration" value={`${timeAllowed} minutes`} />
          <DetailItem label="Exam Level" value={examLevel} />
        </dl>
        {hasAccess ? (
          <div className="">
            <div className="mt-4 md:mt-6 lg:mt-8">
              <MultiStepExamDialog
                examId={examId}
                examSlug={examSlug}
                currentUserId={userId}
                examTime={timeAllowed}
                examLevel={examLevel}
                examName={examName}
                examLength={questionLength}
                questionsToShow={questionsToShow}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <ExamPricingCard
                heading="For 1 year"
                headingTag="Yearly Billing"
                tagline="Perfect for committed learners and professionals aiming for continuous growth and development."
                price="$100"
                duration="year"
                isFeatured
              />
              <ExamPricingCard
                heading="For Life time"
                headingTag="Lifetime Billing"
                tagline="Gain unlimited access to HydraNode's platform and resources for life."
                price="$200"
                duration="week"
              />
            </div>
            <ExamCheckoutDialog
              id={examId}
              name={examName}
              price={examPrice}
              slug={examSlug}
              stripePriceId={stripePriceId}
              session={session}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xl font-medium text-[#878593]">{label}</dt>
      <dd className="transducer-font text-2xl font-bold">{value}</dd>
    </div>
  );
}
