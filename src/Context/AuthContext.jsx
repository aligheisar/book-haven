import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSession } from "../supabase/session";
import { login, logout, register } from "../supabase/auth";
import { formatError } from "../util/format";
import Loading from "../Components/Loading";
import { GetNotifi } from "./NotifiContext";

const authContext = createContext();

export const GetAuth = () => useContext(authContext);

export default function AuthProvider({ children }) {
  let { addNotif } = GetNotifi();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const initializeUser = useCallback(async () => {
    setLoading(true);

    const data = await getSession();
    if (data && data.user) {
      if (data.user) setUser(data.user);
    }

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
    if (!user) initializeUser();
  }, [initializeUser, user]);

  useEffect(() => {
    checkUrl();
  }, [checkUrl]);

  let registerUser = async (email, password, fullName, username) => {
    try {
      let { user } = await register(email, password, fullName, username);
      if (user) {
        setUser(user);
        addNotif({
          title: "Account Registered",
          desc: "You successfuly make an account",
          type: "success",
        });
      }
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    }
  };

  let loginUser = async (email, password) => {
    try {
      let { user } = await login(email, password);
      if (user) {
        setUser(user);
        addNotif({
          title: "Logged in",
          desc: "You successfuly Logged in",
          type: "success",
        });
      }
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    }
  };

  let logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      addNotif({
        title: "Logged Out",
        desc: "You logged out",
        type: "normal",
      });
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    }
  };

  const value = { user, registerUser, loginUser, logoutUser };

  if (loading) return <Loading />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
