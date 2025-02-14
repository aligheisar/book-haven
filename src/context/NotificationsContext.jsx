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
import { getNotifications } from "../supabase/notification";
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

  let unSeenCount = notifications.length;

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

  let value = { notifications, loading, unSeenNotifs, unSeenCount };
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
