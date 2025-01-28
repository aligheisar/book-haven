import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSession } from "../supabase/session";
import Loading from "../Components/Loading";

const authContext = createContext();

export const GetAuth = () => useContext(authContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const initializeUser = useCallback(async () => {
    setLoading(true);
    const newUser = await getSession();
    setUser(newUser?.[0]);
    setLoading(false);

    if (
      (newUser && location.pathname === "/login") ||
      (newUser && location.pathname === "/register") ||
      (!newUser && location.pathname === "/dashbord")
    ) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const value = { user, setLoading };

  if (loading) return <Loading />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
