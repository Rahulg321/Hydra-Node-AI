"use client";

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
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ChangePriceExam from "@/actions/change-price-exam";

const changeExamPriceSchema = z.object({
  price: z.coerce.number().min(1, {
    message: "Minimum price must be one and should be a positive number",
  }),
});

export type ChangeExamPriceFormType = z.infer<typeof changeExamPriceSchema>;

const ChangeExamPriceForm = ({
  examId,
  stripePriceId,
  stripeProductId,
  examPrice,
}: {
  examId: string;
  stripePriceId: string;
  stripeProductId: string;
  examPrice: number;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof changeExamPriceSchema>>({
    resolver: zodResolver(changeExamPriceSchema),
    defaultValues: {
      price: examPrice,
    },
  });

  async function onSubmit(values: ChangeExamPriceFormType) {
    startTransition(async () => {
      const response = await ChangePriceExam(
        examId,
        stripePriceId,
        stripeProductId,
        values,
      );

      if (response.type === "success") {
        toast({
          title: "Price Updated Successfully",
          description: response.message || "Successfully updated price",
        });

        router.refresh();
      }

      if (response.type === "error") {
        toast({
          title: "Error Updating Price",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="$4.99" {...field} />
              </FormControl>
              <FormDescription>Change the Price for the Exam</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating Price..." : "Update Price"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangeExamPriceForm;
