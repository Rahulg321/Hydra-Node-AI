import * as React from "react";

import { cn } from "@/hooks/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "./input";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-10", // Add padding to the right to make space for the icon
            className, // Apply className passed from props
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button" // Important to prevent form submission if this component is in a form
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
