"use client";

import React from "react";
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

const ProfileForm = () => {
  const { toast } = useToast();

  const form = useForm<ProfileFormZodType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: ProfileFormZodType) {
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
        <Button type="submit" className="w-full bg-base">
          Edit Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
