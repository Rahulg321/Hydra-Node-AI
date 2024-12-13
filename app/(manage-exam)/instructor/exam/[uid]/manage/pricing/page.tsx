import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ChangeExamPriceForm from "./exam-price-form";
import db from "@/lib/db";

export default async function CoursePricingPage(
  props: {
    params: Promise<{
      uid: string;
    }>;
  }
) {
  const params = await props.params;
  const examId = params.uid;
  let examPrice = 0;
  let fetchedExam = await db.exam.findUnique({
    where: {
      id: examId,
    },

    select: {
      price: true,
      stripePriceId: true,
      stripeProductId: true,
    },
  });

  if (!fetchedExam) {
    return (
      <div>
        <h2>Could not find Exam</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (fetchedExam) {
    examPrice = fetchedExam.price;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Please finish your premium application</AlertTitle>
        <AlertDescription>
          You&apos;ll be able to set your price once your payout method is
          approved.
        </AlertDescription>
        <Button
          variant="secondary"
          className="mt-2 bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Complete the premium application
        </Button>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Set a price for your exam</CardTitle>
          <CardDescription>
            Please select the price for your exam. If you&apos;d like to offer
            your exam for free, it must have a total duration of less than 2
            hours. Also, exams with practice tests cannot be free.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Current Exam Price</h3>
              <div className="text-3xl font-bold">${examPrice.toFixed(2)}</div>
            </div>
            <ChangeExamPriceForm
              examId={examId}
              stripePriceId={fetchedExam.stripePriceId as string}
              stripeProductId={fetchedExam.stripeProductId as string}
              examPrice={examPrice}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
