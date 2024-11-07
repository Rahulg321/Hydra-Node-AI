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
import {
  NewPasswordFormSchema,
  NewPasswordFormZodType,
} from "@/lib/schemas/NewPasswordSchema";
import { ErrorCard, SuccessCard } from "../FormInfoCards";
import { newPasswordVerification } from "@/actions/new-password-verification";
import { PasswordInput } from "../ui/password-input";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<NewPasswordFormZodType>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: NewPasswordFormZodType) {
    setError("");
    setSuccess("");
    console.log("values", values);
    console.log("token", token);
    startTransition(async () => {
      const response = await newPasswordVerification(values, token);
      if (response?.success) {
        setSuccess(response.success);
      }
      if (response?.error) {
        setError(response.error);
      }
    });
  }

  return (
    <div className="grid grid-cols-2">
      <div></div>
      <div className="block-space container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter new Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ErrorCard urlError={error} />
            <SuccessCard success={success} />
            <Button
              type="submit"
              className="w-full bg-base"
              disabled={isPending}
            >
              {isPending ? "Resetting....." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
