"use client";

import React, { useState, useTransition } from "react";
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
import { resetEmailPassword } from "@/actions/reset-email-password";
import { Session } from "next-auth";
import {
  EditProfileFormSchema,
  EditProfileFormZodType,
} from "@/lib/schemas/EditProfileFormSchema";
import EditUserProfile from "@/actions/edit-profile";
import { PasswordInput } from "../ui/password-input";
import useCurrentUser from "@/hooks/use-current-user";
import { ErrorCard, SuccessCard } from "../FormInfoCards";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GradientButton } from "../buttons/gradient-button";

type ProfileFormProps = {
  userId: string;
  name: string | null;
  email: string | null;
};

const EditProfileForm = ({ userId, name, email }: ProfileFormProps) => {
  const router = useRouter();
  const user = useCurrentUser();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<EditProfileFormZodType>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  });

  async function onSubmit(values: EditProfileFormZodType) {
    startTransition(async () => {
      // await for 3 sec
      setError("");
      setSuccess("");
      const response = await EditUserProfile(values, userId);

      if (response.success) {
        console.log(response);
        setSuccess(response.message);
      } else {
        console.log(response);
        setError(response.message);
      }
    });
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left text-gray-400">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!user?.isOAuth && (
            <React.Fragment>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </React.Fragment>
          )}

          <GradientButton
            type="submit"
            className="w-full bg-base"
            disabled={isPending}
          >
            {isPending ? "Updating Profile..." : "Update Profile"}
          </GradientButton>
        </form>
      </Form>

      <div className="mt-2">
        {success && <SuccessCard success={success} />}
        {error && <ErrorCard urlError={error} />}
      </div>
    </div>
  );
};

export default EditProfileForm;
