import React, { forwardRef } from "react";
import { cn } from "../../util/cn.ts";

type TextareaVarient = "filled" | "outlined";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  varient?: TextareaVarient;
  className?: string;
}

let Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ varient, className, ...props }, ref) => {
    let baseClasses =
      "h-20 w-full resize-none border-0 py-2 placeholder:font-light placeholder:opacity-50 relative text-sm border-0 px-3 text-text outline-none rounded-lg transition-border focus-within:fill-text duration-200 custom-scroll-light";

    let varientClasses: Record<TextareaVarient, string> = {
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

    return <textarea ref={ref} className={classes} {...props}></textarea>;
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
