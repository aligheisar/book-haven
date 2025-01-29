import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSession } from "../supabase/session";
import { login, register } from "../supabase/auth";
import { formatError } from "../util/format";
import Loading from "../Components/Loading";
import { GetNotifi } from "./NotifiContext";

const authContext = createContext();

export const GetAuth = () => useContext(authContext);

export default function AuthProvider({ children }) {
  let { addNotif } = GetNotifi();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const initializeUser = useCallback(async () => {
    setLoading(true);

    const { newUser } = await getSession();
    if (newUser) setUser(newUser);

    setLoading(false);
  }, []);

  let checkUrl = useCallback(() => {
    if (
      (user && location.pathname === "/login") ||
      (user && location.pathname === "/register") ||
      (!user && location.pathname === "/dashbord")
    ) {
      navigate("/");
    }
  }, [location.pathname, user, navigate]);

  useEffect(() => {
    checkUrl();
  }, [checkUrl]);

  useEffect(() => {
    if (!user) initializeUser();
  }, [initializeUser, user]);

  let registerUser = async (email, password, fullName, username) => {
    try {
      await register(email, password, fullName, username);
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    }
  };

  let loginUser = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    }
  };

  const value = { user, setLoading, loginUser, registerUser };

  if (loading) return <Loading />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
