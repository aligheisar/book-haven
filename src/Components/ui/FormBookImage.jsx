import { useRef } from "react";
import BookPlaceholderImage from "../BookImagePlaceholder";
import BookCoverContainer from "./BookCoverContainer";

let FormBookImage = ({ url, handleFileChange }) => {
  let fileInput = useRef();

  let openImagePicker = () => {
    fileInput.current.click();
  };

  return (
    <BookCoverContainer onClick={openImagePicker}>
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
