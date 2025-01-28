import React, { forwardRef, ReactNode } from "react";
import { cn } from "../../util/cn.ts";

type ButtonVarient = "normal" | "dim" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: ButtonVarient;
  Icon?: ReactNode;
  className?: string;
}

let Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ varient, Icon, className, children, ...props }, ref) => {
    let baseClasses = `flex items-center h-10 select-none justify-center gap-2 rounded-full ${
      Icon ? "pl-5 pr-6" : "px-6"
    } font-medium text-lg outline-none transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none`;

    let varientClasses: Record<ButtonVarient, string> = {
      normal:
        "bg-secondary text-text hover:bg-secondary-hover active:bg-secondary-active",
      dim: "bg-on-secondary text-primary hover:bg-on-secondary-hover active:bg-on-secondary-active",
      outlined:
        "border bg-secodary/0 border-secondary/90 text-primary hover:bg-secondary/5 hover:border-secondary/95 active:bg-secondary/10 active:border-secondary/100",
    };

    let classes = cn([
      baseClasses,
      varientClasses[varient || "normal"],
      className,
    ]);

    return (
      <button ref={ref} {...props} className={classes}>
        {Icon}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
