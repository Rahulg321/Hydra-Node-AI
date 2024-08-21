"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "../forms/LoginForm";
import SigninGoogle from "@/components/ComponentButtons/SigninGoogle";
import { useRouter } from "next/navigation";

const LoginDialog = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(true);

  // TODO Close Dialog on successful form submission

  useEffect(() => {
    if (!openDialog) {
      router.back();
    }
  }, [openDialog, router]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h3>Welcome Back!</h3>
          </DialogTitle>
          <DialogDescription>
            Please login to continue to your Account
          </DialogDescription>
        </DialogHeader>
        <div>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
