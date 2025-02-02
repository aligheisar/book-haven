import { cn } from "../util/cn.ts";

let SectionTitle = ({ children, className, ...props }) => {
  return (
    <h1
      className={cn([
        "text-center font-serif text-3xl text-secondary-text",
        className,
      ])}
      {...props}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
