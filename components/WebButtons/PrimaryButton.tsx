import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const PrimaryButton = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <Button
      className={cn("rounded-full bg-base p-6 text-lg font-bold", classname)}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
