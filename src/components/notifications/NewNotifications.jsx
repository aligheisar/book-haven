import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Title from "../ui/Title.jsx";
import Button from "../ui/Button.tsx";
import Backdrop from "../Backdrop.jsx";
import NotificationRenderer from "./NotificationRenderer";
import useKeybordShortcuts from "../../hooks/use-keybord-shortcuts";

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

  useKeybordShortcuts({
    27: {
      func: () => {
        closeNotifications();
      },
    },
  });

  return createPortal(
    <Backdrop
      ref={backdropRef}
      className="bg-transparent"
      onClose={closeNotifications}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="backdrop-child absolute right-44 top-16 flex h-[390px] w-[320px] flex-col gap-2 rounded-md bg-secondary-surface py-2 text-text shadow-xl transition-all duration-300"
      >
        <Title className="ml-3 text-2xl">Notifications</Title>
        <div className="custom-scroll flex flex-1 flex-col overflow-y-auto">
          {notifications && notifications.length > 0 ? (
            <NotificationRenderer
              closeNotifications={closeNotifications}
              notifs={notifications}
            />
          ) : (
            <p className="flex h-full items-center justify-center text-secondary-text">
              No new Notificaiton
            </p>
          )}
        </div>
        <Link to="/notifications" className="mr-2 self-end">
          <Button varient="dim" className="h-fit w-fit px-2 py-[2px] text-sm">
            see More
          </Button>
        </Link>
      </section>
    </Backdrop>,
    document.body,
  );
};

export default NewNotifications;
