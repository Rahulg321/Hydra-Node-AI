import { Exam } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExamDetailsProps {
  exam: Exam & { questions: any[] };
}

export function ExamDetails({ exam }: ExamDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exam.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-muted-foreground">
              Total Questions
            </dt>
            <dd className="text-2xl font-bold">{exam.questions.length}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">
              Mock Exam Questions
            </dt>
            <dd className="text-2xl font-bold">{exam.questionsToShow}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Exam Time</dt>
            <dd className="text-2xl font-bold">{exam.timeAllowed} minutes</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Exam Level</dt>
            <dd className="text-2xl font-bold">{exam.examLevel}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
