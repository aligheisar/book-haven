import { cn } from "../../util/cn.ts";

let Title = ({ className, children, ...props }) => {
  return (
    <h1
      className={cn("font-serif text-5xl text-primary", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
