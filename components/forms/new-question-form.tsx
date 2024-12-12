"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Question } from "@prisma/client";
import TipTapEditor from "../tiptap-editor";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { Content } from "@tiptap/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Image } from "../minimal-tiptap/extensions";
import { Editor } from "@tiptap/core";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";
import { addNewQuestion } from "@/actions/add-question";

const QuestionTypeEnum = z.enum(["multiple_choice", "multi_select"]);

export const NewQuestionFormSchema = z.object({
  question: z.string(),
  questionType: QuestionTypeEnum,
  answerOption1: z.string().min(1, "Option 1 is required"),
  explanation1: z.string().optional(),
  answerOption2: z.string().min(1, "Option 2 is required"),
  explanation2: z.string().optional(),
  answerOption3: z.string().min(1, "Option 3 is required"),
  explanation3: z.string().optional(),
  answerOption4: z.string().min(1, "Option 4 is required"),
  explanation4: z.string().optional(),
  answerOption5: z.string().optional(), // Nullable fields
  explanation5: z.string().optional(),
  answerOption6: z.string().optional(),
  explanation6: z.string().optional(),
  correctAnswers: z.string().min(1, "Correct answer is required"),
  overallExplanation: z.string().optional(),
  domain: z.string().min(1, "Domain is required"),
});

export type NewQuestionFormZodType = z.infer<typeof NewQuestionFormSchema>;

const AddNewQuestionForm = ({ examId }: { examId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<NewQuestionFormZodType>({
    resolver: zodResolver(NewQuestionFormSchema),
    defaultValues: {
      question: "",
      questionType: "multiple_choice",
      answerOption1: "",
      explanation1: "",
      answerOption2: "",
      explanation2: "",
      answerOption3: "",
      explanation3: "",
      answerOption4: "",
      explanation4: "",
      answerOption5: "",
      explanation5: "",
      answerOption6: "",
      explanation6: "",
      correctAnswers: "",
      overallExplanation: "",
      domain: "",
    },
  });

  function onSubmit(values: NewQuestionFormZodType) {
    startTransition(async () => {
      console.log("values", values);

      const response = await addNewQuestion(examId, values);
      if (response.type === "success") {
        toast({
          title: "Question Added 🎉",
          variant: "success",
          description: "Question was edited successfully",
          action: (
            <ToastAction
              altText="View Question"
              onClick={() => {
                router.push(
                  `/instructor/exam/${examId}/questions/${response.questionId}`,
                );
              }}
            >
              View
            </ToastAction>
          ),
        });
        router.push(
          `/instructor/exam/${examId}/questions/${response.questionId}`,
        );
      } else {
        toast({
          title: "Error Adding Question",
          variant: "destructive",
          description: "Server Side Error Occured",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  }

  Image.configure({
    allowedMimeTypes: ["image/jpeg", "image/png", "image/gif"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    // uploadFn: async (file: File, editor: Editor) => {
    //   // Implement your upload logic here
    //   // Return the URL of the uploaded image

    //   return "https://example.com/uploaded-image.jpg";
    // },
    allowBase64: true,
    onActionSuccess: () => {
      console.log("image was added successfully");
      alert(`image was added successfully`);
    },
    onActionError: (error, props) => {
      console.error("Image action failed:", error, props);
      // Show user-friendly error message
      alert(`image upload failed ${error.message} ${error.name}`);
    },
    onValidationError: (errors) => {
      console.error("Image validation failed:", errors);
      // Show validation error to the user
      alert(`image validation failed ${errors}`);
    },
  });

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Question Type */}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Question</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    throttleDelay={0}
                    className={cn("w-full", {
                      "border-destructive focus-within:border-destructive":
                        form.formState.errors.question,
                    })}
                    editorContentClassName="some-class"
                    output="html"
                    placeholder="Type your question here here..."
                    autofocus={true}
                    editable={true}
                    injectCSS={true}
                    editorClassName="focus:outline-none p-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 1</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 1..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 2</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 2..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 3</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 3</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 3..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 4</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 4</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 4..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 5</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 5</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 5.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="answerOption6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer Option 6</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer Option 6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="px-4">
              <FormField
                control={form.control}
                name="explanation6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation 6</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Explanation 6..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multi_select">Multi Select</SelectItem>
                      <SelectItem value="multiple_choice">
                        Multiple Choice
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Correct Answers */}
          <FormField
            control={form.control}
            name="correctAnswers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answers</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Correct answers (comma-separated for multi-select)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Overall Explanation */}
          <FormField
            control={form.control}
            name="overallExplanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Explanation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Explanation for the correct answer(s)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Domain */}
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter domain (e.g., Science, History)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding" : "Add"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewQuestionForm;
