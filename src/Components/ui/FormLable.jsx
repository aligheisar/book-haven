import { cn } from "../../util/cn.ts";

let FormLable = ({ id, children, className, ...props }) => {
  return (
    <label
      htmlFor={id}
      className={cn("ml-2 select-none text-lg text-text", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default FormLable;
