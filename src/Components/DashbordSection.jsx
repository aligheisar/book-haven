import { cn } from "../util/cn.ts";

let DashbordSection = ({ className, children, ...props }) => {
  let classes = cn([
    "flex flex-col gap-5 bg-surface w-full max-w-[420px] px-4 py-6 rounded-xl",
    className,
  ]);
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

export default DashbordSection;
