import { createPortal } from "react-dom";
import { GetNotifi } from "../../context/NotifiContext";
import NotifiItem from "./NotifiItem";

let NotifiContainer = () => {
  let { notifications } = GetNotifi();

  if (!notifications || notifications.length === 0) return null;
  return createPortal(
    <section className="fixed left-1/2 top-16 z-30 flex w-72 -translate-x-1/2 flex-col gap-2">
      {notifications.map((i) => (
        <NotifiItem key={i.id} notif={i} />
      ))}
    </section>,
    document.body,
  );
};

export default NotifiContainer;
