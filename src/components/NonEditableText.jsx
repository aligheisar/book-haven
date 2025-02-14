import { cn } from "../util/cn.ts";
import { trimLong } from "../util/format";

let NonEditableText = ({ className, props, content, threshold, title }) => {
  return (
    <h2
      className={cn([
        "flex h-[45px] w-full items-center justify-center gap-2 text-center text-xl text-text",
        className,
      ])}
      {...props}
    >
      <span className="font-serif text-base opacity-45">{title}:</span>

      {trimLong(content, threshold)}
    </h2>
  );
};

export default NonEditableText;
