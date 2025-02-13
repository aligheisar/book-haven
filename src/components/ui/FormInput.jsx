import { useId } from "react";
import { cn } from "../../util/cn.ts";
import Input from "./Input.tsx";
import InputError from "../InputError";
import FormLabel from "./FormLable";

let FormInput = ({
  type = "text",
  label,
  placeholder,
  className,
  inputClassName,
  error,
  ...inputProps
}) => {
  let id = useId();

  return (
    <section className={cn("flex flex-col gap-2", className)}>
      {label && <FormLabel id={id}>{label}</FormLabel>}
      <Input
        varient="outlined"
        id={id}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <InputError>{error}</InputError>}
    </section>
  );
};

export default FormInput;
