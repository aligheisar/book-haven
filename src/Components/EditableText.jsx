import { useState } from "react";
import { cn } from "../util/cn.ts";
import Input from "./ui/Input.tsx";
import InputError from "./InputError.jsx";
import { Done, Edit, Loading } from "./ui/Icons";
import useKeybordShortcuts from "../hooks/use-keybord-shortcuts";

let EditableText = ({
  content,
  changeHandler,
  validator,
  className,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(() => ({
    value: content,
    error: null,
  }));

  let handleInputChange = (e) => {
    let { value } = e.target;
    let error = validator(value);

    setInputValue({ value, error });
  };

  let done = async (accept = true) => {
    let value = inputValue.value.trim();
    if (value && accept && value !== content) {
      setLoading(true);
      let error = await changeHandler(value);
      setLoading(false);
      if (error && error.status) {
        setInputValue({ value: content, error: null });
      } else {
        setInputValue({ value, error: null });
      }
    } else {
      setInputValue({ value: content, error: null });
    }
    setEditMode(false);
  };

  let startEdit = () => {
    setEditMode(true);
  };

  useKeybordShortcuts({
    27: {
      func: () => {
        done(false);
      },
    },
  });

  return editMode ? (
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
  ) : (
    <h2
      className={cn([
        "group relative flex h-[45px] w-full items-center justify-center text-center text-xl text-text",
        className,
      ])}
      {...props}
    >
      {content}
      <span
        onClick={startEdit}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded bg-text/0 fill-text/70 p-1 hover:bg-text/10 group-hover:block"
      >
        <Edit inher size="16" />
      </span>
    </h2>
  );
};

export default EditableText;
