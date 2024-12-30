import { Exam } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExamDetailsProps {
  name: string;
  examLevel: string;
  questionsToShow: number;
  timeAllowed: number;
  questions: any[];
}

export function ExamDetails({
  name,
  examLevel,
  questionsToShow,
  questions,
  timeAllowed,
}: ExamDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-muted-foreground">
              Total Questions
            </dt>
            <dd className="text-2xl font-bold">{questions.length}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">
              Mock Exam Questions
            </dt>
            <dd className="text-2xl font-bold">{questionsToShow}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Exam Time</dt>
            <dd className="text-2xl font-bold">{timeAllowed} minutes</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Exam Level</dt>
            <dd className="text-2xl font-bold">{examLevel}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
