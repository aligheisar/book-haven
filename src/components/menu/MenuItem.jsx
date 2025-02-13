import { useContext } from "react";
import { MenuContext } from "./Menu";
import { cn } from "../../util/cn.ts";

let MenuItem = ({ children, className, fn = () => {}, ...props }) => {
  let { setIsOpen } = useContext(MenuContext);

  return (
    <div
      onClick={() => {
        fn();
        setIsOpen(false);
      }}
      {...props}
      className={cn(
        "text-nowrap rounded-sm px-2 py-[2px] text-text hover:bg-secondary-surface/50",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MenuItem;
