import { cn } from "../../util/cn.ts";

let HorizontalSection = ({ className, children, ...props }) => {
  return (
    <section
      className={cn(
        "custom-scroll flex gap-2 overflow-x-auto rounded-md",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default HorizontalSection;
