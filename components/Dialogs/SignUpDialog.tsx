"use client";

import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";

const SignUpDialog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(true);

  useEffect(() => {
    if (openDialog === false) {
      router.back();
    }
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} defaultOpen={true}>
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
