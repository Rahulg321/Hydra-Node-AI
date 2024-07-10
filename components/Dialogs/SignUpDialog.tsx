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
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
