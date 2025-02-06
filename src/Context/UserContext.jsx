import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSession } from "../supabase/session";
import { GetNetwork } from "./NetworkContext";
import { changeUserInformation } from "../supabase/user";
import { GetNotifi } from "./NotifiContext";
import { formatError } from "../util/format";
import { getBooksByUsername } from "../supabase/books";

let UserContext = createContext();

export let GetUser = () => useContext(UserContext);

let UserProvider = ({ children }) => {
  const { setIsOnline } = GetNetwork();
  const { addNotif } = GetNotifi();

  const [user, setUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  let initializeUser = useCallback(async () => {
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

  let fetchUserBooks = useCallback(async () => {
    try {
      let response = await getBooksByUsername(user.username);

      setUserBooks(
        response.data.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          imageUrl: i.image_url,
          fullName: i.full_name,
          username: i.username,
        })),
      );
    } catch (error) {
      addNotif({
        type: "warning",
        title: "can't load",
        desc: "we can't load user books",
      });
    }
  }, [user?.username, addNotif]);

  let changeAvatar = async (file, fileName) => {
    try {
      let response = await changeUserInformation(user.username, "avatar", {
        file,
        fileName,
      });

      if (response.success) {
        const updatedAvatarUrl = `${response.avatar_url}?t=${new Date().getTime()}`;
        setUser((prevState) => ({
          ...prevState,
          avatar_url: updatedAvatarUrl,
        }));
        addNotif({
          title: "Avatar changes",
          desc: "avatar picture succesfully changed",
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

  let changeFullName = async (value) => {
    try {
      let response = await changeUserInformation(
        user.username,
        "full_name",
        value,
      );

      if (response.success) {
        setUser((prev) => ({ ...prev, fullName: value }));
        addNotif({
          title: "full Name changes",
          desc: "your full name was succesfully changed",
          type: "success",
        });
      }
    } catch (error) {
      addNotif({
        ...formatError(error),
        type: "danger",
      });
      return error;
    }
  };

  let value = {
    user,
    userBooks,
    setUser,
    fetchUserBooks,
    loading,
    setLoading,
    changeAvatar,
    changeFullName,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
