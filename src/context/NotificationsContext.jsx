import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GetUser } from "./UserContext";
import { GetNotifi } from "./NotifiContext";
import { getNotifications, seenNotificaitons } from "../supabase/notification";
import { supabase } from "../supabase/client";

let NotificationsContext = createContext();

export let GetNotifications = () => useContext(NotificationsContext);

let NotificationsProvider = ({ children }) => {
  let { user } = GetUser();
  let { addNotif } = GetNotifi();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  let unSeenNotifs = useMemo(
    () => notifications.filter((i) => !i.seen),
    [notifications],
  );

  let unSeenCount = unSeenNotifs.length;

  let fetchNotifications = useCallback(
    async (turnLoadingOn = false) => {
      try {
        if (turnLoadingOn) {
          setLoading(true);
        }

        let response = await getNotifications();

        if (response.success) {
          setNotifications(response.data);
        }
      } catch (error) {
        addNotif({
          type: "danger",
          title: "can't load",
          desc: "we can't load your notifications",
        });
      } finally {
        setLoading(false);
      }
    },
    [addNotif],
  );

  let markNotificationsAsSeen = async () => {
    if (!unSeenNotifs.length) return;

    let unSeenIds = notifications.filter((i) => !i.seen).map((i) => i.id);

    try {
      let response = await seenNotificaitons(unSeenIds);

      console.log(response);
      if (response.success) {
        setNotifications((prev) => prev.map((i) => ({ ...i, seen: true })));
      }
    } catch (error) {
      console.log(error);
      addNotif({
        type: "danger",
        title: "Faild",
        desc: "something happends",
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchNotifications(true);
  }, [user, fetchNotifications]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        () => {
          fetchNotifications();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchNotifications]);

  let value = {
    notifications,
    loading,
    unSeenNotifs,
    unSeenCount,
    markNotificationsAsSeen,
  };
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
