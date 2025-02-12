import React, { FC } from "react";
import { cn } from "../../util/cn.ts";
import Button from "./Button.tsx";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
}

let Form: FC<FormProps> = ({ children, title, className, ...props }) => {
  let baseClasses =
    "flex flex-col gap-4 w-[470px] items-center bg-surface rounded-[14px] px-4 py-4 shadow-lg";

  let classes = cn([baseClasses, className]);
  return (
    <form className={classes} {...props}>
      {title ? (
        <h2 className="select-none font-serif text-4xl text-primary">
          {title}
        </h2>
      ) : null}
      <section className="flex w-full flex-col gap-[18px]">{children}</section>
      <Button className="h-[45px] w-full rounded-md">{title}</Button>
    </form>
  );
};

export default Form;
