"use client";

import React, { useTransition } from "react";
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
import {
  ProfileFormSchema,
  ProfileFormZodType,
} from "@/lib/schemas/ProfileFormSchema";
import { resetEmailPassword } from "@/actions/reset-email-password";
import { Session } from "next-auth";

type ProfileFormProps = {
  name: string;
  session: Session;
};

const ProfileForm = ({ name, session }: ProfileFormProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormZodType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name,
      password: "",
    },
  });

  async function onSubmit(values: ProfileFormZodType) {
    startTransition(async () => {
      // await for 3 sec
      const response = await resetEmailPassword(
        values,
        session.user.id as string,
      );
      if (response.success) {
        toast({
          title: "Form Submit Successful",
          variant: "success",
          description: response.success || "Successfully Completed Action",
        });
        form.reset();
      } else if (response.error) {
        toast({
          title: "ERROR 🥲",
          variant: "destructive",
          description: response.error || "Could not find your account",
        });
      }
    });
  }

  return (
    <div className="mt-4 px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
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
          {!session.user.isCredentialsLogin && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="strong password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full bg-base" disabled={isPending}>
            {isPending ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
