import { useState } from "react";
import { GetNotifications } from "../../context/NotificationsContext";
import { Loading, Notification } from "../ui/Icons";
import NewNotifications from "./NewNotifications";

let NotificationsButton = () => {
  let { loading, unSeenNotifs, unSeenCount } = GetNotifications();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="relative flex size-8 cursor-pointer items-center justify-center rounded fill-secondary-text hover:bg-text/5"
      >
        {loading ? (
          <Loading inher className="animate-spin" />
        ) : (
          <>
            {unSeenCount > 0 && (
              <span className="absolute -left-[2px] -top-[2px] rounded-full bg-danger px-[6px] text-[10px] text-text">
                {unSeenCount}
              </span>
            )}
            <Notification inher />
          </>
        )}
      </span>
      {isOpen && (
        <NewNotifications
          notifications={unSeenNotifs}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationsButton;
