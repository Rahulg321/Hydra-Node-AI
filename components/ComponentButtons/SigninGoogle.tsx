import React from "react";
import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";

const SigninGoogle = () => {
  return (
    <Button variant={"outline"}>
      <BsGoogle className="mr-2 h-4 w-4" /> Sign in With Google
    </Button>
  );
};

export default SigninGoogle;
