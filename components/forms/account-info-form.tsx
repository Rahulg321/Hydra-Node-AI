"use client";

import React, { useTransition } from "react";
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
  AccountInfoFormSchema,
  AccountInfoFormSchemaZodType,
} from "@/hooks/lib/schemas/AccountInforFormSchema";
import { GradientButton } from "../buttons/gradient-button";
import { updateAccountInfo } from "@/actions/account-info";

const AccountInfoForm = ({
  firstName,
  lastName,
  userId,
}: {
  firstName: string | undefined;
  lastName: string | undefined;
  userId: string;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountInfoFormSchemaZodType>({
    resolver: zodResolver(AccountInfoFormSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  async function onSubmit(values: AccountInfoFormSchemaZodType) {
    startTransition(async () => {
      try {
        const { success } = await updateAccountInfo({
          userId,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        if (!success) {
          throw new Error("Failed to update account info");
        }

        toast({
          title: "Form Submit",
          variant: "success",
          description: "Submitted Form",
        });
      } catch (error) {
        toast({
          title: "Form Submit",
          variant: "destructive",
          description: "Error Submitting Form",
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe...."
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe...."
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GradientButton
          type="submit"
          className="w-full rounded-none"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Info"}
        </GradientButton>
      </form>
    </Form>
  );
};

export default AccountInfoForm;
