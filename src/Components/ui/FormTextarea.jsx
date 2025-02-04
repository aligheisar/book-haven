import { useId } from "react";
import InputError from "../InputError";
import TextArea from "./Textarea.tsx";

let FormTextarea = ({ label, placeholder, error, ...inputProps }) => {
  let id = useId();

  return (
    <section className="flex flex-col gap-2">
      <label htmlFor={id} className="ml-2 select-none text-lg text-text">
        {label}
      </label>
      <TextArea
        varient="outlined"
        id={id}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <InputError>{error}</InputError>}
    </section>
  );
};

export default FormTextarea;
