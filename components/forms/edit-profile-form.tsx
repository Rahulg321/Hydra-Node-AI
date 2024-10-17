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
import { resetEmailPassword } from "@/actions/reset-email-password";
import { Session } from "next-auth";
import {
  EditProfileFormSchema,
  EditProfileFormZodType,
} from "@/lib/schemas/EditProfileFormSchema";
import EditUserProfile from "@/actions/edit-profile";

type ProfileFormProps = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
};

const EditProfileForm = ({ userId, firstName, lastName }: ProfileFormProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditProfileFormZodType>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  async function onSubmit(values: EditProfileFormZodType) {
    startTransition(async () => {
      // await for 3 sec
      const response = await EditUserProfile(values, userId);

      if (response.success) {
        toast({
          title: "Form Submit Successful",
          variant: "success",
          description: response.success || "Successfully Completed Action",
        });
      } else {
        toast({
          title: "ERROR 🥲",
          variant: "destructive",
          description: response.message || "Could not find your account",
        });
      }
    });
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
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
                  <Input placeholder=" Doe...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-base" disabled={isPending}>
            {isPending ? "Updating Profile..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
