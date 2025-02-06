import { cn } from "../../util/cn.ts";

let BookCoverContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "aspect-[1/1.4] h-full shrink-0 cursor-pointer overflow-hidden rounded",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default BookCoverContainer;
