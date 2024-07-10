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

const SignUpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ReusbaleButton>Sign Up</ReusbaleButton>
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
        <span className="text-muted-foreground text-sm">
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
