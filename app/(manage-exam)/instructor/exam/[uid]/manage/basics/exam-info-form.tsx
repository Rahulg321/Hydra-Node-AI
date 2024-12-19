"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Image } from "@/components/minimal-tiptap/extensions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import UpdateExamInformation from "@/actions/update-exam-information";
import { useToast } from "@/hooks/use-toast";
import { ExamLevel } from "@prisma/client";
import { Label } from "@/components/ui/label";

const examLevels = Object.values(ExamLevel) as [string, ...string[]];

const examInfoFormSchema = z.object({
  name: z.string().min(1, { message: "Exam name is required." }).max(100, {
    message: "Exam name must not exceed 100 characters.",
  }),
  description: z.string(),
  subtitle: z.string().max(120, {
    message: "Course subtitle must not exceed 120 characters.",
  }),
  category: z.string().min(1, { message: "Category is required." }),
  level: z.enum(examLevels, { required_error: "Exam level is required." }),
});

export type examInfoFormSchemaType = z.infer<typeof examInfoFormSchema>;

export default function ExamInformationForm({
  examId,
  name,
  description,
  subtitle,
  category,
  level,
}: {
  examId: string;
  name: string;
  description: string | null;
  subtitle: string | null;
  category: string | null;
  level: ExamLevel;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<examInfoFormSchemaType>({
    resolver: zodResolver(examInfoFormSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      subtitle: subtitle || "",
      category: category || "",
      level: level || ExamLevel.ASSOCIATE,
    },
  });

  function onSubmit(values: examInfoFormSchemaType) {
    startTransition(async () => {
      const res = await UpdateExamInformation(examId, values);
      if (res.type === "success") {
        toast({
          title: "Successfully Updated Exam Information",
          description: res.message || "Exam information updated successfully.",
        });
        router.refresh();
      }

      if (res.type === "error") {
        toast({
          title: "Error Updating Exam Information",
          description:
            res.message || "An error occurred while updating exam information.",
          variant: "destructive",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter exam name"
                    {...field}
                    maxLength={100}
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    {field.value.length}/100
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                Provide a clear and concise name for your exam.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label>Exam Description</Label>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    throttleDelay={0}
                    className={cn("w-full", {
                      "border-destructive focus-within:border-destructive":
                        form.formState.errors.description,
                    })}
                    editorContentClassName="some-class"
                    output="html"
                    placeholder="Type your description here here..."
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
        </div>
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course subtitle</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Insert your course subtitle"
                    {...field}
                    maxLength={120}
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    {field.value.length}/120
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                Use 1-2 related keywords, and mention 3-4 of the most important
                areas that you&apos;ve covered during your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter exam category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ExamLevel).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating....." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
