import SignUpDialog from "@/components/Dialogs/SignUpDialog";
import React from "react";

const page = () => {
  console.log("intercepted signup route");
  return <SignUpDialog />;
};

export default page;
