import { cn } from "../../util/cn.ts";

let Description = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        "custom-scroll-light max-h-16 overflow-y-auto text-sm text-text opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Description;
