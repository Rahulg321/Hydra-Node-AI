"use client";

import React, { use, useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const LoginDialog = () => {
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
