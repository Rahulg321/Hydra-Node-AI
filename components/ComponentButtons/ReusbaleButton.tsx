import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface ReusableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

const ReusbaleButton: React.FC<ReusableButtonProps> = ({
  children,
  variant = "primary",
  ...restProps
}) => {
  return (
    <Button
      className={clsx(
        "rounded-full p-6",
        variant === "primary" && "",
        variant === "outline" && ""
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default ReusbaleButton;
