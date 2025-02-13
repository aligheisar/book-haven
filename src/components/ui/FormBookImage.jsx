import { useRef } from "react";
import { cn } from "../../util/cn.ts";
import { Trash } from "./Icons";
import BookPlaceholderImage from "../BookImagePlaceholder";
import BookCoverContainer from "./BookCoverContainer";

let FormBookImage = ({
  className,
  url,
  handleFileChange,
  handleRemoveFile,
}) => {
  let fileInput = useRef();

  let openImagePicker = () => {
    fileInput.current.click();
  };

  let removeImage = (e) => {
    e.stopPropagation();
    handleRemoveFile();
    fileInput.current.value = "";
  };

  return (
    <BookCoverContainer
      className={cn(
        "relative h-80 outline outline-secondary-surface",
        className,
      )}
      onClick={openImagePicker}
    >
      <span
        onClick={removeImage}
        className={cn(
          `absolute bottom-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded border border-text/0 ${url ? "border-text/40" : ""} fill-text shadow-lg backdrop-blur-xl transition-colors hover:bg-text/5 hover:fill-danger`,
        )}
      >
        <Trash size={20} inher />
      </span>
      <input
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
        accept=".jpg"
        style={{ display: "none" }}
      />
      {url ? (
        <img src={url} className="h-full w-full object-cover" alt="" />
      ) : (
        <BookPlaceholderImage />
      )}
    </BookCoverContainer>
  );
};

export default FormBookImage;
