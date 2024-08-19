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
import { CircleX } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  let urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormZodType),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: LoginFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      console.log(values);
      const response = await LoginUser(values);
      if (response.success) {
        toast({
          title: "Action Completed Successfully 🎉",
          variant: "success",
          description: response.success || "Action successful",
        });
      }

      if (response.error) {
        toast({
          title: "ERROR 🥲",
          variant: "destructive",
          description: response.error || "Could not find your account",
        });
      }
    });
  }

  return (
    <div>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"link"}
            size={"default"}
            className="px-0 font-normal"
            asChild
          >
            <Link href="/auth/reset">Forgot Password</Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Keep me logged in
            </label>
          </div>
          <Button type="submit" className="w-full bg-base" disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <ErrorCard urlError={urlError} />
      </div>
    </div>
  );
};

export default LoginForm;

function ErrorCard({ urlError }: { urlError?: string }) {
  return (
    <div>
      {urlError ? (
        <div className="flex items-center gap-2 rounded-md border border-red-600 bg-red-200 p-2">
          <div className="p-2 text-red-800">
            <CircleX />
          </div>
          <div>
            <span className="text-sm text-red-800">{urlError}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
