import { cn } from "../../util/cn.ts";

let Description = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        `custom-scroll-light max-h-16 overflow-y-auto text-sm text-text ${!children ? "line-through opacity-40" : "opacity-70"}`,
        className,
      )}
      {...props}
    >
      {children || "No description"}
    </p>
  );
};

export default Description;
