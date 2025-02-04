import { useRef } from "react";
import BookPlaceholderImage from "../BookImagePlaceholder";
import BookCoverContainer from "./BookCoverContainer";

let FormBookImage = ({ url, handleFileChange }) => {
  let fileInput = useRef();

  let handleChange = async (e) => {
    await handleFileChange(e);
    fileInput.current.value = "";
  };

  let openImagePicker = () => {
    fileInput.current.click();
  };

  return (
    <BookCoverContainer onClick={openImagePicker}>
      <input
        ref={fileInput}
        onChange={handleChange}
        type="file"
        accept=".jpg"
        style={{ display: "none" }}
      />
      {url ? <img src={url} alt="" /> : <BookPlaceholderImage />}
    </BookCoverContainer>
  );
};

export default FormBookImage;
