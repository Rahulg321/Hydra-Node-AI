import React from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  variant?: "narrow" | "wide";
  space?: "big" | "small";
  className?: string;
  children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  (
    {
      as: Comp = "section",
      variant = "narrow",
      space = "small",
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={clsx(
          "",
          variant === "narrow" && "narrow-container",
          variant === "wide" && "big-container",
          space === "small" && "block-space-mini",
          space === "big" && "block-space",
          className
        )}
        {...restProps}
      >
        {children}
      </Comp>
    );
  }
);

// Set a display name for the component
Bounded.displayName = "Bounded";

export default Bounded;

