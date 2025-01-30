import { cn } from "../util/cn.ts";

let DashbordSection = ({ className, children, ...props }) => {
  let classes = cn([
    "flex flex-col gap-3 bg-surface w-full max-w-[1070px] px-4 py-6 rounded-xl",
    className,
  ]);
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};

export default DashbordSection;
