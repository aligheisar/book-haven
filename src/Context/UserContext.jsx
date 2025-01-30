import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSession } from "../supabase/session";
import { GetNetwork } from "./NetworkContext";

let UserContext = createContext();

export let GetUser = () => useContext(UserContext);

let UserProvider = ({ children }) => {
  const { setIsOnline } = GetNetwork();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeUser = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getSession();
      if (data && data.user) {
        if (data.user) setUser(data.user);
      }

      setLoading(false);
    } catch (error) {
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, [setUser, setIsOnline]);

  useEffect(() => {
    if (!user) initializeUser();
  }, [initializeUser, user]);
  let value = { user, setUser, loading, setLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
