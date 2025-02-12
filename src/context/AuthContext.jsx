import { createContext, useContext } from "react";
import { login, logout, register } from "../supabase/auth";
import { formatError } from "../util/format";
import Loading from "../components/Loading";
import { GetNotifi } from "./NotifiContext";
import { GetUser } from "./UserContext";

const AuthContext = createContext();

export const GetAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  let { user, setUser, loading, setLoading } = GetUser();
  let { addNotif } = GetNotifi();

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
      await logout();
      setUser(null);
      addNotif({
        type: "success",
        title: "Logged Out",
        desc: "you successfuly logged out",
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
