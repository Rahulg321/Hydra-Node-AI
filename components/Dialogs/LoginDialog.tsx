"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReusbaleButton from "../ComponentButtons/ReusbaleButton";
import LoginForm from "../forms/LoginForm";

const LoginDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <ReusbaleButton
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Login
        </ReusbaleButton>
      </DialogTrigger>
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
