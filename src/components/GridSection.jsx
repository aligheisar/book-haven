import { cn } from "../util/cn.ts";

let GridSection = ({ className, children, ...props }) => {
  return (
    <section
      className={cn("flex flex-wrap gap-2 rounded-md", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default GridSection;
