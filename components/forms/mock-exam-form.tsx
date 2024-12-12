"use client";

import React, { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  MockExamFormSchema,
  MockExamZodType,
} from "@/lib/schemas/mock-exam-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExamModeValues, useExamModeContext } from "@/lib/exam-mode-context";
import CreateCustomExam from "@/actions/custom-exam";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import axios from "axios";
import { checkIfUserHasAccessToExam } from "@/lib/utils";

const MockExamForm = ({
  examId,
  examSlug,
  examTime,
  currentUserId,
  buttonLabel = "Start Exam",
}: {
  examId: string;
  examSlug: string;
  examTime: number;
  currentUserId: string;
  buttonLabel?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { examMode, setExamMode } = useExamModeContext();

  const showSubscriptionToast = () => {
    toast({
      variant: "destructive",
      title: "Not Subscribed ❌",
      description:
        "Subscribe to one of our pricing plans or purchase this exam to access it.",
      action: (
        <ToastAction altText="Subscribe">
          <Link href="/pricing">Subscribe</Link>
        </ToastAction>
      ),
    });
  };

  const form = useForm<MockExamZodType>({
    resolver: zodResolver(MockExamFormSchema),
    defaultValues: {
      totalTime: examTime,
      examMode: examMode ? examMode : ExamModeValues.PRACTICE,
    },
  });

  function onSubmit(values: MockExamZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
    startTransition(async () => {
      try {
        setExamMode(values.examMode);

        const hasAccessResponse = await checkIfUserHasAccessToExam(
          currentUserId,
          examId,
        );

        if (!hasAccessResponse) {
          showSubscriptionToast();
          return;
        }

        const response = await CreateCustomExam(values, examId, currentUserId);

        if (response.type === "error") {
          console.log("could not start quiz session from dialog");
          toast({
            title: "Could not Start Quiz 🥲",
            variant: "destructive",
            description: response.message || "Could not find your account",
          });
        }

        if (response.type === "success") {
          console.log("successfully started quiz session from dialog");
          toast({
            title: "Quiz Created🎉🥲",
            description: response.message || "Successfully started Quiz",
          });

          router.push(`/exam/${examSlug}/quiz/${response.quizSessionId}`);
        }

        console.log("exam mode is", examMode);
      } catch (error) {
        console.error("error in quiz session form", error);
        toast({
          title: "Could not Start Quiz 🥲",
          variant: "destructive",
          description: "An error occured, please try again later!!",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="totalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Exam Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="exam time.."
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormDescription>Total time for the exam</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select and confirm mode of the exam" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PRACTICE">Practice</SelectItem>
                  <SelectItem value="MOCK">Mock</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating Exam" : buttonLabel}
        </Button>
      </form>
    </Form>
  );
};

export default MockExamForm;
