import { useId } from "react";
import Input from "./Input.tsx";
import InputError from "../InputError";

let FormInput = ({
  type = "text",
  label,
  placeholder,
  error,
  ...inputProps
}) => {
  let id = useId();

  return (
    <section className="flex flex-col gap-2">
      <label htmlFor={id} className="ml-2 select-none text-lg text-text">
        {label}
      </label>
      <Input
        varient="outlined"
        id={id}
        type={type}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <InputError>{error}</InputError>}
    </section>
  );
};

export default FormInput;
