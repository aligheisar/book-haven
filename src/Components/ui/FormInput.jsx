import { useId } from "react";
import Input from "./Input.tsx";

let FormInput = ({ type = "text", label, placeholder, ...inputProps }) => {
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
    </section>
  );
};

export default FormInput;
