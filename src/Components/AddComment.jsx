import { GetBookDetails } from "../context/BookDetailsContext";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button.tsx";
import FormTextarea from "./ui/FormTextarea";

let AddComment = () => {
  let { handleAddCommentSubmit, handleCommentChange, commentContent } =
    GetBookDetails();

  return (
    <form
      onSubmit={handleAddCommentSubmit}
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
      <FormTextarea
        varient="filled"
        inputClassName="rounded"
        placeholder="Enter your Comment here"
        value={commentContent.value}
        onChange={handleCommentChange}
        error={commentContent.error}
      ></FormTextarea>
    </form>
  );
};

export default AddComment;
