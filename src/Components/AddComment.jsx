import { useRef } from "react";
import { GetBookDetails } from "../context/BookDetailsContext";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button.tsx";
import Textarea from "./ui/Textarea.tsx";

let AddComment = () => {
  let { addBookComment } = GetBookDetails();

  let textareaRef = useRef();

  let handleSubmit = (e) => {
    e.preventDefault();

    addBookComment(textareaRef.current.value);

    textareaRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg bg-surface p-3"
    >
      <div className="flex items-center justify-between">
        <SectionTitle className="ml-1 text-left text-2xl">
          Add Comment
        </SectionTitle>
        <Button varient="dim" className="h-9 rounded px-4 text-base">
          Add
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        className="rounded"
        varient="filled"
        placeholder="Enter your Comment here"
      ></Textarea>
    </form>
  );
};

export default AddComment;
