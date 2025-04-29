"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/hooks/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface GradientButtonProps extends ButtonProps {
  showArrow?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, showArrow = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] text-white transition-opacity hover:opacity-90",
          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Button>
    );
  },
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
