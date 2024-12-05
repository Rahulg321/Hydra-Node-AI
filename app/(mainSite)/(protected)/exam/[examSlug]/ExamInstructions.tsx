import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExamInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Examination Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>You can pause the test at any time and resume later.</li>
          <li>You can retake the test as many times as you would like.</li>
          <li>You can skip questions and return to them later.</li>
          <li>
            Use &quot;Mark for review&quot; for questions you&apos;re unsure
            about.
          </li>
          <li>
            Press the stop button to finish the test and see your results
            immediately.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
