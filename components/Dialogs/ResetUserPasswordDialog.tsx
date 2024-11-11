"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { z } from "zod";
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
import { PasswordInput } from "../ui/password-input";
import { useToast } from "@/hooks/use-toast";
import resetLoggedInUserPassword from "@/actions/reset-logged-user-password";
import {
  ResetLoggedUserPasswordSchema,
  ResetLoggedUserPasswordType,
} from "@/lib/schemas/ResetLoggedUserPassword";

export function ResetUserPasswordDialog({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link">Reset Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Reset your password. Enter your updated password below.
            </DialogDescription>
          </DialogHeader>
          <ResetUserPasswordForm userId={userId} setDialogOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Reset Password</DrawerTitle>
          <DrawerDescription>
            Reset your password. Enter your updated password below.
          </DrawerDescription>
        </DrawerHeader>
        <ResetUserPasswordForm
          className="px-4"
          userId={userId}
          setDialogOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ResetUserPasswordForm({
  className,
  userId,
  setDialogOpen,
}: {
  className?: string;
  userId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        setDialogOpen(false);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>Enter your Old Password.</FormDescription>
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
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>Enter your New Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-baseC" disabled={isPending}>
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
