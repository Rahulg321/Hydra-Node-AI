"use client";

import React, { Suspense, useState, useTransition } from "react";
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
import {
  SignUpFormSchema,
  SignUpFormZodType,
} from "@/lib/schemas/SignUpFormSchema";
import { SignUpUser } from "@/actions/sign-up";
import { useToast } from "@/components/ui/use-toast";
import SigninGoogle from "../ComponentButtons/SigninGoogle";
import { ErrorCard, SuccessCard } from "../FormInfoCards";
import { PasswordInput } from "../ui/password-input";
import { GradientButton } from "../buttons/gradient-button";

const SignupForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpFormZodType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: SignUpFormZodType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setError("");
    setSuccess("");

    startTransition(async () => {
      console.log(values);
      const response = await SignUpUser(values);
      if (response.success) {
        setSuccess(response.success);
      } else if (response.error) {
        setError(response.error);
      }
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john"
                    className="text-gray-400"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@email.com"
                    className="text-gray-400"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="**********"
                    className="text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="flex list-disc justify-between p-4 text-sm text-muted-foreground">
            <div>
              <li>Use 8 or more characters</li>
              <li>Use a number(e.g. 1234)</li>
            </div>
            <div>
              <li>Use upper and lower case letter</li>
              <li>Use a symbol (e.g. !@#$)</li>
            </div>
          </ul>
          {error && <ErrorCard urlError={error} />}
          {success && <SuccessCard success={success} />}
          <GradientButton type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating User..." : "Sign up"}
          </GradientButton>
        </form>
      </Form>
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <Suspense>
        <SigninGoogle />
      </Suspense>
    </div>
  );
};

export default SignupForm;
