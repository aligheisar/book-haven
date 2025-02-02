import { cn } from "../util/cn.ts";

let NonEditableText = ({ className, props, content, title }) => {
  return (
    <h2
      className={cn([
        "flex h-[45px] w-full items-center justify-center gap-2 text-center text-xl text-text",
        className,
      ])}
      {...props}
    >
      <span className="font-serif text-base opacity-45">{title}:</span>

      {content}
    </h2>
  );
};

export default NonEditableText;
