import React, { forwardRef, ReactNode } from "react";
import { cn } from "../../util/cn.ts";

type InputVarient = "filled" | "outlined";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  varient?: InputVarient;
  icon: ReactNode;
  className?: string;
}

let Input = forwardRef<HTMLInputElement, InputProps>(
  ({ varient, icon, className, ...props }, ref) => {
    let baseClasses = `relative text-lg border-0 ${icon ? "pl-9" : "px-3"} fill-secondary-text h-[45px] text-text outline-none rounded-lg transition-border focus-within:fill-text duration-200`;

    let varientClasses: Record<InputVarient, string> = {
      filled:
        "border-transparent bg-secondary-surface placeholder:text-scondary-text border-[1px] focus-within:border-secondary-text",
      outlined:
        "border border-secondary-text placeholder:text-secondary-text bg-transparent focus-within:border-text",
    };

    let classes = cn([
      baseClasses,
      varientClasses[varient || "filled"],
      className,
    ]);

    return (
      <section className={classes}>
        <span className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          ref={ref}
          className="h-full w-full border-none bg-transparent outline-none placeholder:text-base placeholder:font-light placeholder:text-secondary-text placeholder:opacity-90 placeholder:transition-colors focus-within:placeholder:text-text"
          {...props}
        />
      </section>
    );
  },
);

Input.displayName = "Input";

export default Input;
