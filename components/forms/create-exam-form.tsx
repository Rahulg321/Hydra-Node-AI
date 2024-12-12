"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  CreateExamFormType,
  createExamSchema,
} from "../schemas/create-exam-schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { Image } from "../minimal-tiptap/extensions";
import createVendorExam from "@/actions/create-vendor-exam";

export default function CreateExamForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateExamFormType>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      timeAllowed: 10,
      category: undefined,
      examLevel: "ASSOCIATE",
    },
  });

  async function onSubmit(data: CreateExamFormType) {
    startTransition(async () => {
      console.log("data", data);
      const res = await createVendorExam(JSON.stringify(data));

      if (res.type === "success") {
        toast({
          title: "Exam Created Successfully",
          description: res.message || "Successfully created exam",
        });

        router.push(`/instructor/exam/${res.examId}/manage`);
      }

      if (res.type === "error") {
        toast({
          title: "Could not create exam",
          description: res.message || "please try again later",
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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Exam</h1>
        <p className="text-gray-500">
          Give your exam a name and select its category. You can modify these
          details later.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Introduction to Mathematics"
                    {...field}
                    className="max-w-xl"
                  />
                </FormControl>
                <FormDescription>
                  Enter a descriptive name for your exam.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="Type your description here..."
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Price</FormLabel>
                <FormControl>
                  <Input placeholder="$3.99" {...field} className="max-w-xl" />
                </FormControl>
                <FormDescription>
                  Enter a starting price for your exam
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeAllowed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="15 minutes"
                    {...field}
                    className="max-w-xl"
                  />
                </FormControl>
                <FormDescription>
                  Enter total time for your exam
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="max-w-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ASSOCIATE">Associate</SelectItem>
                    <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                    <SelectItem value="EXPERT">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the level that best fits this exam.
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="max-w-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="computer-science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits your exam.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="" disabled={isPending}>
            {isPending ? "Creating Exam...." : "Create Exam"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
