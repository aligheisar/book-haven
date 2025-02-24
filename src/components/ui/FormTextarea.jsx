import { useId } from "react";
import FormLable from "./FormLable";
import InputError from "../InputError";
import TextArea from "./Textarea.tsx";
import { cn } from "../../util/cn.ts";

let FormTextarea = ({
  className,
  inputClassName,
  label,
  varient = "outlined",
  placeholder,
  error,
  ...inputProps
}) => {
  let id = useId();

  return (
    <section className={cn("flex flex-col gap-2", className)}>
      {label && <FormLable id={id}>{label}</FormLable>}
      <TextArea
        className={inputClassName}
        varient={varient}
        id={id}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <InputError>{error}</InputError>}
    </section>
  );
};

export default FormTextarea;
