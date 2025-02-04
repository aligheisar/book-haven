import { useEffect, useState } from "react";

let useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    let onlineHandler = () => {
      setIsOnline(true);
    };
    let offlineHandler = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, [isOnline]);

  return { isOnline, setIsOnline };
};

export default useIsOnline;
