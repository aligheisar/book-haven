import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Title from "./ui/Title";
import Button from "./ui/Button.tsx";
import Backdrop from "./Backdrop";
import NotificationRenderer from "./NotificationRenderer"

let NewNotifications = ({ onClose, notifications }) => {
  let backdropRef = useRef();

  let closeNotifications = () => {
    backdropRef.current.classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      backdropRef.current.classList.add("active");
    }, 0);
  }, []);

  return createPortal(
    <Backdrop
      ref={backdropRef}
      className="bg-transparent"
      onClose={closeNotifications}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="backdrop-child flex flex-col h-[390px] gap-2 py-2 w-[320px] absolute right-44 top-16 rounded-md bg-secondary-surface text-text shadow-xl transition-all duration-300"
      >
        <Title className="ml-3 text-2xl">Notifications</Title>
        <div className="custom-scroll flex-1 flex overflow-y-auto flex-col">
          {notifications && notifications.length > 0 ? (
            <NotificationRenderer closeNotifications={closeNotifications} notifs={notifications} />

          ) : (
            <p className="text-secondary-text h-full flex items-center justify-center">No new Notificaiton</p>
          )}</div>
        <Link to="/notifications" className="self-end mr-2">
          <Button varient="dim" className="text-sm h-fit w-fit px-2 py-[2px]">see More</Button>
        </Link>
      </section>
    </Backdrop>,
    document.body,
  );
};

export default NewNotifications;
