import { cn } from "../util/cn.ts";

let PageContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={cn("mx-auto flex max-w-[720px] flex-col", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default PageContainer;
