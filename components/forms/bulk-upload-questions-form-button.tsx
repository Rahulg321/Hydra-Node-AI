"use client";

import { z } from "zod";
import React from "react";
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
import Papa from "papaparse";
import { FileIcon, Loader } from "lucide-react";
import { useToast } from "../ui/use-toast";
// import BulkUploadQuestions from "@/app/actions/BulkUploadQuestions";

export const bulkUploadSchema = z.object({
  questions: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: "Your resume must be less than 7MB.",
  }),
});

type BulkUploadSchemaZodType = z.infer<typeof bulkUploadSchema>;

const BulkUploadQuestionsFormButton = ({
  examId,
  setDialogState,
}: {
  examId: string;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bulkUploadSchema>>({
    resolver: zodResolver(bulkUploadSchema),
  });

  function onSubmit(values: z.infer<typeof bulkUploadSchema>) {
    startTransition(async () => {
      console.log("type safe and validated");
      const file = values.questions;
      console.log("file is", file);

      if (file) {
        const reader = new FileReader();

        reader.onload = async (event) => {
          const text = event.target?.result;
          console.log("text is", text);
          if (typeof text === "string") {
            // Parse the CSV file using PapaParse
            const parsedData = Papa.parse(text, { header: true });

            console.log("parsed data is", parsedData.data);

            // const response = await BulkUploadQuestions(examId, parsedData.data);

            // if (response.type === "success") {
            //   toast({
            //     variant: "success",
            //     title: "Successfully Uploaded Questions 🎉",
            //     description: response.message,
            //   });
            //   setDialogState(false);
            // }

            // if (response.type === "error") {
            //   toast({
            //     variant: "destructive",
            //     title: "Uh oh! Something went wrong. ❌",
            //     description: response.message,
            //   });
            // }
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };

        reader.readAsText(file);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="questions"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Questions</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Upload Questions"
                  type="file"
                  accept=".csv"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          variant={"destructive"}
        >
          {isPending ? (
            <div className="flex items-center">
              <Loader className="mr-2 h-4 w-4" />
              Uploading Questions....
            </div>
          ) : (
            <div className="flex items-center">
              <FileIcon className="mr-2 h-4 w-4" /> Upload CSV
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BulkUploadQuestionsFormButton;
