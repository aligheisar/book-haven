import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAuth } from "../Context/AuthContext";
import Button from "./ui/Button.tsx";
import Modal from "./ui/Modal";
import { Logout } from "./ui/Icons";

let ProfileCard = ({ user }) => {
  let { logoutUser } = GetAuth();

  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  let navigateDashboard = () => {
    setIsOpen(false);
    navigate("dashboard");
  };

  let userLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <section
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="flex items-center gap-2 rounded-full bg-secondary-surface p-1 pl-3"
      >
        <p>{user.fullName}</p>
        <img
          width={37}
          height={37}
          src={user.avatarUrl}
          alt="profile"
          className="h-[37px] w-[37px] rounded-full bg-surface"
        />
      </section>
      {isOpen && (
        <Modal className="w-44" onClose={() => setIsOpen(false)}>
          <section className="flex flex-col gap-1">
            <Button
              onClick={navigateDashboard}
              className="w-full rounded"
              varient="dim"
            >
              Dashboard
            </Button>
            <Button
              Icon={<Logout inher />}
              className="w-full items-center rounded fill-secondary-text"
              varient="outlined"
              onClick={userLogout}
            >
              Logout
            </Button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default ProfileCard;
