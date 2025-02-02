import InputError from "./InputError";
import Input from "./ui/Input.tsx";
import { Done, Loading } from "./ui/Icons";

let EditableTextInput = ({
  loading,
  handleInputChange,
  inputValue,
  props,
  done,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative h-[45px] w-full">
        <Input
          varient="filled"
          autoFocus
          disabled={loading}
          onChange={handleInputChange}
          value={inputValue.value}
          onKeyDown={(e) => (e.keyCode === 13 ? done(true) : null)}
          onBlur={() => done(true)}
          className="bg-surface/30"
          inputClass="text-center text-xl"
          {...props}
        />
        <span
          onClick={() => done(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-text/0 fill-text/70 p-1 hover:bg-text/10"
        >
          {loading ? (
            <Loading inher size="18" className="animate-spin" />
          ) : (
            <Done inher size="16" />
          )}
        </span>
      </div>
      {inputValue.error && <InputError>{inputValue.error}</InputError>}
    </div>
  );
};

export default EditableTextInput;
