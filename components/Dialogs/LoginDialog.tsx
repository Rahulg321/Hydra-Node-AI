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
import SigninGoogle from "@/components/ComponentButtons/SigninGoogle";

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
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <SigninGoogle />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
