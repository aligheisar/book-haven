import { cn } from "../../util/cn.ts";

let BookCoverContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "aspect-[1/1.4] h-80 shrink-0 cursor-pointer overflow-hidden rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default BookCoverContainer;
