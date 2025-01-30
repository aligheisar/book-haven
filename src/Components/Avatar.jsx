import { useRef } from "react";
import { cn } from "../util/cn.ts";

let Avatar = ({ url, name, className, ...props }) => {
  let fileInput = useRef();

  let handleImageClick = () => {
    fileInput.current.click();
  };

  let handleInputChange = (e) => {
    let firstFile = e.target.files[0];
    if (!firstFile) return;
  };

  return (
    <>
      <img
        className={cn(["size-12 rounded-full", className])}
        {...props}
        src={url}
        alt={name}
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInput}
        onChange={handleInputChange}
        accept=".png,.jpg"
        style={{ display: "none" }}
      />
    </>
  );
};

export default Avatar;
