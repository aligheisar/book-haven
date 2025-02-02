import { createContext, useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, logout, register } from "../supabase/auth";
import { formatError } from "../util/format";
import Loading from "../Components/Loading";
import { GetNotifi } from "./NotifiContext";
import { GetUser } from "./UserContext";

const authContext = createContext();

export const GetAuth = () => useContext(authContext);

export default function AuthProvider({ children }) {
  let { user, setUser, loading, setLoading } = GetUser();
  let { addNotif } = GetNotifi();

  const navigate = useNavigate();
  const location = useLocation();

  let checkUrl = useCallback(() => {
    if (loading) return;
    if (
      (user && location.pathname === "/login") ||
      (user && location.pathname === "/register") ||
      (!user && location.pathname === "/dashbord")
    ) {
      navigate("/");
    }
  }, [location.pathname, user, navigate, loading]);

  useEffect(() => {
    checkUrl();
  }, [checkUrl]);

  let registerUser = async (email, password, username, fullName) => {
    try {
      setLoading(true);
      let { user } = await register(email, password, username, fullName);
      setLoading(false);
      if (user) {
        addNotif({
          title: "Account Registered",
          desc: "You successfuly make an account",
          type: "success",
        });
        setUser(user);
      }
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  let loginUser = async (email, password) => {
    try {
      setLoading(true);
      let { user } = await login(email, password);
      setLoading(false);
      if (user) {
        addNotif({
          title: "Logged in",
          desc: "You successfuly Logged in",
          type: "success",
        });
        setUser(user);
      }
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  let logoutUser = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const value = { user, registerUser, loginUser, logoutUser };

  if (loading) return <Loading />;

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
