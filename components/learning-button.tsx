"use client";

import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@/hooks/lib/utils";

interface LearningButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  icon?: React.ReactNode;
}

const LearningButton: React.FC<LearningButtonProps> = ({
  onClick,
  href,
  icon,
  label,
}) => {
  const Component = href ? "a" : "button";
  // get the current path
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Component
      onClick={onClick}
      href={href}
      className="flex items-center justify-start rounded-lg transition-colors"
    >
      <div
        className={cn("rounded-lg bg-[#171616] px-4 py-4", {
          "bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)]":
            isActive,
        })}
      >
        <div
          className={cn("flex h-6 w-6 items-center justify-center rounded-lg", {
            "text-white": isActive,
          })}
        >
          {icon}
        </div>
      </div>
      <span
        className={cn("ml-2 block font-medium text-white/30", {
          "text-white": isActive,
        })}
      >
        {label}
      </span>
    </Component>
  );
};

export default LearningButton;
