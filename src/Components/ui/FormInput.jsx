import { useId } from "react";
import Input from "./Input.tsx";
import InputError from "../InputError";
import FormLabel from "./FormLable";

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
      <FormLabel id={id}>{label}</FormLabel>
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
