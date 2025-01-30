import { useRef, useState } from "react";
import { cn } from "../util/cn.ts";
import Input from "./ui/Input.tsx";
import { Done, Edit, Loading } from "./ui/Icons";
import useKeybordShortcuts from "../hooks/use-keybord-shortcuts.jsx";

let EditableText = ({ content, changeHandler, className, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  let input = useRef();

  let done = async (accept = true) => {
    let value = input.current.value.trim();
    if (value && accept && value !== content) {
      setLoading(true);
      await changeHandler(value);
      setLoading(false);
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
    <div className="relative h-[45px] w-full">
      <Input
        varient="filled"
        ref={input}
        autoFocus
        disabled={loading}
        onKeyDown={(e) => (e.keyCode === 13 ? done(true) : null)}
        onBlur={() => done(true)}
        defaultValue={content}
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
