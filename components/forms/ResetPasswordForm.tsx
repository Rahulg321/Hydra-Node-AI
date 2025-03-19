"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  LoginFormZodType,
} from "@/lib/schemas/LoginFormSchema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { LoginUser } from "@/actions/login";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { BadgeCheck, CircleX } from "lucide-react";
import Link from "next/link";
import {
  ResetPasswordFormSchema,
  ResetPasswordFormZodType,
} from "@/lib/schemas/ResetPasswordFormSchema";
import { resetPassword } from "@/actions/reset-password";
import { ErrorCard, SuccessCard } from "../FormInfoCards";
import { GradientButton } from "../buttons/gradient-button";

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<ResetPasswordFormZodType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormZodType) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      console.log("values", values);
      const response = await resetPassword(values);
      if (response?.success) {
        setSuccess(response.success);
      }
      if (response?.error) {
        setError(response.error);
      }
    });
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ErrorCard urlError={error} />
          <SuccessCard success={success} />
          <GradientButton
            type="submit"
            className="bg-base"
            disabled={isPending}
          >
            {isPending ? "Resetting....." : "Send Reset Email"}
          </GradientButton>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
