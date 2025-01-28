import { createContext, useContext, useState } from "react";

let NotifiContext = createContext();

export let GetNotifiContext = () => useContext(NotifiContext);

let NotifiProvider = ({ children }) => {
  let [notifications, setNotifications] = useState([]);

  let addNotif = (notif) => {
    setNotifications((prev) => [...prev, notif]);
  };

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
