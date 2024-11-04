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
import {
  ContactFormSchema,
  ContactFormSchemaZodType,
} from "@/lib/schemas/ContactFormSchema";
import { Textarea } from "../ui/textarea";
import submitContactForm from "@/actions/contact-email";
import { useToast } from "@/hooks/use-toast";

const ContactUsForm = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormSchemaZodType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormSchemaZodType) {
    startTransition(async () => {
      const response = await submitContactForm(values);
      if (response.status) {
        toast({
          title: "Submitted Contact Form ✅",
          description: response.message,
        });
      } else {
        toast({
          title: "Submitted Contact Form ❌",
          variant: "destructive",
          description: response.message,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="john..."
                  {...field}
                  className="border-none bg-gray-700 placeholder:text-gray-400"
                />
              </FormControl>
              <FormDescription>Enter First Name.</FormDescription>
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
                <Input
                  placeholder="doe....."
                  {...field}
                  className="border-none bg-gray-700 placeholder:text-gray-400"
                />
              </FormControl>
              <FormDescription>Enter Last Name.</FormDescription>
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
                <Input
                  placeholder="johndoe@gmail.com"
                  type="email"
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

        <Button
          type="submit"
          className="w-full bg-base p-4 text-white"
          disabled={isPending}
        >
          {isPending ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
