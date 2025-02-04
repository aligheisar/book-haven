import { cn } from "../../util/cn.ts";

let BookCoverContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "h-64 w-56 cursor-pointer overflow-hidden rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default BookCoverContainer;
