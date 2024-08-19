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
import LoginForm from "../forms/LoginForm";
import SigninGoogle from "@/components/ComponentButtons/SigninGoogle";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react";

const LoginDialog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(true);

  // TODO Close Dialog on successful form submission

  useEffect(() => {
    if (openDialog === false) {
      router.back();
    }
  }, [openDialog, setOpenDialog, router]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
