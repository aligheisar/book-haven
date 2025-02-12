import { useRef, useState } from "react";
import { GetUser } from "../context/UserContext";
import { Loading } from "./ui/Icons";
import { cn } from "../util/cn.ts";

let DashboardAvatar = ({ className, ...props }) => {
  const { changeAvatar, user } = GetUser();

  const [loading, setLoading] = useState(false);

  let fileInput = useRef();

  let handleImageClick = () => {
    if (!loading) fileInput.current.click();
  };

  let updateAvatar = async (file, fileName) => {
    setLoading(true);
    await changeAvatar(file, fileName);
    setLoading(false);
  };

  let handleInputChange = async (e) => {
    let firstFile = e.target.files[0];
    if (!firstFile) return;

    await updateAvatar(firstFile, firstFile.name);

    e.target.value = "";
  };

  return (
    <div
      className={cn([
        `relative size-14 rounded-full ${loading ? "opacity-50" : ""} overflow-hidden shadow-lg`,
        className,
      ])}
    >
      {loading && (
        <div className="absolute grid h-full w-full animate-spin place-content-center fill-background">
          <Loading size="28" inher />
        </div>
      )}
      <img
        className="h-full w-full object-cover"
        {...props}
        src={user.avatarUrl}
        alt={user.fullName}
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInput}
        onChange={handleInputChange}
        accept=".jpg"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DashboardAvatar;
