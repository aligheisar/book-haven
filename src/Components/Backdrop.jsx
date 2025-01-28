import { forwardRef } from "react";
import { cn } from "../util/cn.ts";

let Backdrop = forwardRef(({ children, className, onClose, ...props }, ref) => {
  return (
    <section
      ref={ref}
      onClick={onClose}
      {...props}
      className={cn(
        "backdrop fixed inset-0 bg-background/50 transition-opacity duration-300",
        className,
      )}
    >
      {children}
    </section>
  );
});

export default Backdrop;
