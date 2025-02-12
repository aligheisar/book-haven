import { nanoid } from "nanoid";
import { createContext, useCallback, useContext, useState } from "react";

let NotifiContext = createContext();

export let GetNotifi = () => useContext(NotifiContext);

let NotifiProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  let addNotif = useCallback((notif) => {
    let id = nanoid();
    setNotifications((prev) => [...prev, { ...notif, id }]);

    setTimeout(() => {
      removeNotif(id);
    }, 3000);
  }, []);

  let removeNotif = (id) => {
    setNotifications((prev) => prev.filter((i) => i.id !== id));
  };

  let removeAllNotif = () => {
    setNotifications([]);
  };

  let value = { notifications, addNotif, removeNotif, removeAllNotif };
  return (
    <NotifiContext.Provider value={value}>{children}</NotifiContext.Provider>
  );
};

export default NotifiProvider;
