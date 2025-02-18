import { useNavigate } from "react-router-dom";
import { GetAuth } from "../context/AuthContext";
import { GetModal, MODAL_NAMES } from "../context/ModalContext";
import Button from "./ui/Button.tsx";
import { Logout } from "./ui/Icons";

let ProfileCard = ({ user }) => {
  let { logoutUser } = GetAuth();
  let { openModal } = GetModal();

  let navigate = useNavigate();

  let navigateDashboard = () => {
    navigate("dashboard");
  };

  let userLogout = () => {
    logoutUser();
    navigate("/login");
  };

  let handleOpenModal = () => {
    openModal(MODAL_NAMES.CUSTOM, {
      children: (
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
      ),
      className: "right-12 top-16",
      closeOnClick: true,
    })
  }

  return (
    <section
      onClick={handleOpenModal}
      className="flex items-center gap-2 rounded-full bg-secondary-surface p-1 pl-3"
    >
      <p>{user.fullName}</p>
      <img
        draggable={false}
        width={37}
        height={37}
        src={user.avatarUrl}
        alt="profile"
        className="h-[37px] w-[37px] rounded-full bg-surface"
      />
    </section >
  );
};

export default ProfileCard;
