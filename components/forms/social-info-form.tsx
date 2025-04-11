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

import {
  SocialInfoFormSchema,
  SocialInfoFormSchemaZodType,
} from "@/lib/schemas/SocialInfoFormSchema";
import { GradientButton } from "../buttons/gradient-button";
import { updateSocialInfo } from "@/actions/social-info";
const SocialInfoForm = ({
  linkedinLink,
  twitterLink,
  userId,
}: {
  linkedinLink: string | undefined;
  twitterLink: string | undefined;
  userId: string;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SocialInfoFormSchemaZodType>({
    resolver: zodResolver(SocialInfoFormSchema),
    defaultValues: {
      linkedinLink: linkedinLink || "",
      twitterLink: twitterLink || "",
    },
  });

  async function onSubmit(values: SocialInfoFormSchemaZodType) {
    startTransition(async () => {
      try {
        const { success } = await updateSocialInfo({
          userId,
          linkedinLink: values.linkedinLink || "",
          twitterLink: values.twitterLink || "",
        });

        console.log("success", success);

        if (!success) {
          throw new Error("Failed to update social info");
        }

        toast({
          title: "Form Submit",
          variant: "success",
          description: "Submitted Form",
        });
      } catch (error) {
        toast({
          title: "Form Submit",
          variant: "destructive",
          description: "Error Submitting Form",
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="linkedinLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/john-doe"
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://twitter.com/john-doe"
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GradientButton
          type="submit"
          className="w-full rounded-none"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Social Links"}
        </GradientButton>
      </form>
    </Form>
  );
};

export default SocialInfoForm;
