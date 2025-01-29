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

  const value = { user, setLoading, loginUser, registerUser };

  if (loading) return <Loading />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
