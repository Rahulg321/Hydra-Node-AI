"use client";

import type * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/hooks/lib/utils";

interface NumericInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function NumericInput({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 1,
  unit,
  className,
  ...props
}: NumericInputProps) {
  const handleIncrement = () => {
    if (max !== undefined && value + step > max) return;
    onChange(value + step);
  };

  const handleDecrement = () => {
    if (min !== undefined && value - step < min) return;
    onChange(value - step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    if (min !== undefined && newValue < min) {
      onChange(min);
      return;
    }

    if (max !== undefined && newValue > max) {
      onChange(max);
      return;
    }

    onChange(newValue);
  };

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden rounded-md bg-[#535353] text-white",
        className,
      )}
    >
      <input
        type="text"
        value={unit ? `${value} ${unit}` : value}
        onChange={handleChange}
        className="w-full border-none bg-transparent px-2 py-2 font-medium focus:outline-none focus:ring-0"
        {...props}
      />
      <div className="absolute right-1 flex flex-col bg-[#B1B1B1]">
        <button
          type="button"
          onClick={handleIncrement}
          className="p-0.5 text-black"
          aria-label="Increment"
        >
          <ChevronUp className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          className="p-0.5 text-black"
          aria-label="Decrement"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
