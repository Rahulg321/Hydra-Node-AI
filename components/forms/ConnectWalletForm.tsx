"use client";

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
import { useToast } from "@/components/ui/use-toast";
import {
  ConnectWalletFormSchema,
  ConnectWalletFormZodType,
} from "@/hooks/lib/schemas/ConnectWalletFormSchema";

const ConnectWalletForm = () => {
  const { toast } = useToast();

  const form = useForm<ConnectWalletFormZodType>({
    resolver: zodResolver(ConnectWalletFormSchema),
    defaultValues: {
      walletAddress: "",
    },
  });

  async function onSubmit(values: ConnectWalletFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    toast({
      title: "Form Submit",
      variant: "success",
      description: "Submitted Form",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-base">
          Verify Address
        </Button>
      </form>
    </Form>
  );
};

export default ConnectWalletForm;
