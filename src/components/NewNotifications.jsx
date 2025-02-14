import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import { useEffect, useRef } from "react";

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
        className="backdrop-child absolute right-44 top-16 rounded-md bg-secondary-surface text-text shadow-xl transition-all duration-300"
      >
        {notifications.map((i) => (
          <h1>{i.type}</h1>
        ))}
      </section>
    </Backdrop>,
    document.body,
  );
};

export default NewNotifications;
