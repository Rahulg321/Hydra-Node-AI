import React from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

const ReusbaleButton = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) => {
  return (
    <Button
      className={clsx(
        "rounded-full p-6",
        variant === "primary" && "",
        variant === "outline" && ""
      )}
    >
      {children}
    </Button>
  );
};

export default ReusbaleButton;
