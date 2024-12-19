"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { addTagsToExam } from "@/actions/add-exam-tags";
import { Tag } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  examId: z.string().cuid(),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag is required")
        .max(50, "Tag must be 50 characters or less"),
    )
    .min(1, "At least one tag is required"),
});

export function ExamTagForm({
  examId,
  tags,
}: {
  examId: string;
  tags: string[];
}) {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examId: examId,
      tags,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "tags", //  <---  Add the name of the field array here
  });

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      append(inputValue.trim()); // Use a string value directly
      setInputValue("");
    }
  };

  const handleRemoveTag = (index: number) => {
    remove(index);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addTagsToExam(values);
        toast({
          title: "Success",
          description: "Tags added to exam",
        });
        form.reset({ tags: [] });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add tags to exam",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2 rounded-md border p-2">
                  {fields.map((field, index) => (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="text-sm"
                    >
                      {form.getValues(`tags.${index}`)}{" "}
                      {/* Access the value using getValues */}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type a tag and press Enter"
                    className="flex-grow border-none focus:ring-0"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Add tags to categorize this exam. Press Enter to add each tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
