import { cn } from "../util/cn.ts";

let GridSection = ({ className, children, ...props }) => {
  return (
    <section
      className={cn(
        "mx-auto grid w-fit grid-cols-3 gap-2 rounded-md",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default GridSection;
