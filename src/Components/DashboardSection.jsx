import { cn } from "../util/cn.ts";

let DashboardSection = ({ className, children, ...props }) => {
  let classes = cn([
    "flex flex-col gap-7 bg-surface w-full max-w-[380px] px-4 py-6 rounded-xl",
    className,
  ]);
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

export default DashboardSection;
