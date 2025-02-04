import { useState } from "react";
import { cn } from "../../util/cn.ts";

let AutoCompelete = ({ className, inputItems, ...props }) => {
  const [items, setItems] = useState(() => inputItems);

  return (
    <div
      {...props}
      className={cn(
        "absolute left-0 top-1 flex max-h-36 w-full flex-col rounded-md border border-secondary bg-secondary-surface",
        className,
      )}
    >
      {items.map((i) => (
        <div className="px-2 py-1 text-text hover:bg-text/10">{i}</div>
      ))}
    </div>
  );
};

export default AutoCompelete;
