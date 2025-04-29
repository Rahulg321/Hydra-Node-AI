"use client";

import { useToast } from "@/hooks/use-toast";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { GradientButton } from "../buttons/gradient-button";
import resetLoggedInUserPassword from "@/actions/reset-logged-user-password";
import { ResetLoggedUserPasswordSchema } from "@/hooks/lib/schemas/ResetLoggedUserPassword";
import { ResetLoggedUserPasswordType } from "@/hooks/lib/schemas/ResetLoggedUserPassword";

interface ResetUserPasswordDialogProps {
  userId: string;
}

export function ResetUserPasswordDialog({
  userId,
}: ResetUserPasswordDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const ResetUserPasswordForm = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<ResetLoggedUserPasswordType>({
      resolver: zodResolver(ResetLoggedUserPasswordSchema),
      defaultValues: {
        oldPassword: "",
        newPassword: "",
      },
    });

    // 2. Define a submit handler.
    function onSubmit(values: ResetLoggedUserPasswordType) {
      startTransition(async () => {
        console.log(values);
        const response = await resetLoggedInUserPassword(userId, values);
        if (response.type === "error") {
          toast({
            title: "An error occured",
            description: response.message,
            variant: "destructive",
          });
        }

        if (response.type === "success") {
          toast({
            title: "Success",
            description: response.message,
            variant: "success",
          });
          setIsSuccess(true);
        }
      });
    }

    return (
      <>
        {isSuccess ? (
          <SuccessScreen
            title="YOUR PASSWORD IS SUCCESSFULLY UPDATED"
            buttonText="Done"
            onButtonClick={() => setIsSuccess(false)}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <GradientButton type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </GradientButton>
            </form>
          </Form>
        )}
      </>
    );
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex cursor-pointer items-center whitespace-nowrap bg-[#362F2C] px-2 py-2 text-xs text-white/70">
          Change Password
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset User Password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new password for the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ResetUserPasswordForm />
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface SuccessScreenProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

export function SuccessScreen({
  title,
  buttonText,
  onButtonClick,
  className,
}: SuccessScreenProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 py-8 ${className}`}
    >
      <div className="flex items-center justify-center rounded-full bg-orange-500 p-4">
        <Check className="h-6 w-6 text-white" />
      </div>
      <h2 className="text-center text-xl font-bold tracking-wider">{title}</h2>
      <GradientButton onClick={onButtonClick} className="px-8">
        {buttonText}
      </GradientButton>
    </div>
  );
}
