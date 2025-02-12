import { cn } from "../util/cn.ts";

let DashboardSection = ({ className, children, ...props }) => {
  let classes = cn([
    "flex min-h-[310px] overflow-x-hidden flex-col gap-7 bg-surface w-full px-4 justify-between py-6 rounded-xl",
    className,
  ]);
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

export default DashboardSection;
