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
import {
  ContactFormSchema,
  ContactFormZodType,
} from "@/lib/schemas/ContactFormSchema";
import { Textarea } from "../ui/textarea";

const ContactUsForm = () => {
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(ContactFormZodType),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  {...field}
                  className="border-none bg-gray-700 placeholder:text-gray-400"
                />
              </FormControl>
              <FormDescription>Enter a valid email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message here"
                  {...field}
                  className="border-none bg-gray-700 placeholder:text-gray-400"
                />
              </FormControl>
              <FormDescription>Send a message to the team.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-base p-4 text-lg text-white">
          Get Started
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;