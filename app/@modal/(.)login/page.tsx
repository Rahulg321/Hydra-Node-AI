import { auth } from "@/auth";
import LoginDialog from "@/components/Dialogs/LoginDialog";
import LoginForm from "@/components/forms/LoginForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  return <LoginDialog />;
};

export default page;
