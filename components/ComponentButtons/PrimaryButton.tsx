import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface ReusableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outlined";
  classname?: string;
}

const PrimaryButton: React.FC<ReusableButtonProps> = ({
  classname,
  children,
  variant = "primary",
  ...restProps
}) => {
  return (
    <Button
      className={clsx(
        "",
        variant === "primary" && "rounded-full bg-base p-6 text-lg font-bold",

        variant === "outlined" &&
          "rounded-full border-2 border-base p-6 text-lg font-bold text-[#5d5fef]",
        classname,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
