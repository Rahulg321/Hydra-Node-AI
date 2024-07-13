import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import SignupForm from "../forms/SignupForm";
import Link from "next/link";
import { Button } from "../ui/button";

const SignUpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-base p-6 text-lg font-bold">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h3>Create an Account</h3>
          </DialogTitle>
          <DialogDescription>
            Please sign up to create your account.
          </DialogDescription>
        </DialogHeader>
        <SignupForm />
        <span className="text-sm text-muted-foreground">
          By creating an Account, you agree to the{" "}
          <Link href={"#"} className="underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href={"#"} className="underline">
            Privacy Policy
          </Link>
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
