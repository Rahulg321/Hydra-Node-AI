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
  const [show2fa, setShow2fa] = useState(false);
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

      if (response.twoFactorToken) {
        setShow2fa(true);
        toast({
          title: "SENT 2FA EMAIL🎉",
          variant: "success",
          description: "Action successful",
        });
      }

      if (response.success) {
        toast({
          title: "Action Completed Successfully 🎉",
          variant: "success",
          description: response.success || "Action successful",
        });
      }

      if (response.error) {
        // reset the entire form
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {show2fa && (
            <div>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Secret Code</FormLabel>
                    <FormControl>
                      <Input placeholder="312312" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {!show2fa && (
            <React.Fragment>
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
            </React.Fragment>
          )}
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
            {show2fa ? "Confirm" : "Log in"}
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
        <div className="flex flex-col items-center gap-2 rounded-md border border-red-600 bg-red-200 p-2 sm:flex-row">
          <div className="p-2 text-red-800">
            <CircleX />
          </div>
          <div className="text-center sm:text-left">
            <span className="text-sm text-red-800">{urlError}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
