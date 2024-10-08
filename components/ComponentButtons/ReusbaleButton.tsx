import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface ReusableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  classname?: string;
}

const ReusbaleButton: React.FC<ReusableButtonProps> = ({
  classname,
  children,
  variant = "primary",
  ...restProps
}) => {
  return (
    <Button
      className={clsx(
        "rounded-full p-6",
        classname,
        variant === "primary" && "",
        variant === "outline" && "border-4 border-base bg-none",
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default ReusbaleButton;
