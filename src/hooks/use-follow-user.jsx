import { useEffect, useState } from "react";
import { checkIfFollowing, toggleFollowUser } from "../supabase/user";
import { GetUser } from "../Context/UserContext";
import { GetNotifi } from "../Context/NotifiContext";
import { formatError } from "../util/format";

let useFollowUser = (username) => {
  let { user } = GetUser();
  let { addNotif } = GetNotifi();

  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    let checkIsFollow = async () => {
      try {
        let { data } = await checkIfFollowing(user.username, username);

        setTargetUser(data);
      } catch (error) {
        addNotif({
          type: "danger",
          ...formatError(error),
        });
        setTargetUser({
          fullName: "unknown",
          imgageUrl: null,
          isFollow: false,
        });
      } finally {
        setLoading(false);
      }
    };

    checkIsFollow();
  }, [user.username, username, addNotif]);

  let toggleFollow = async () => {
    try {
      setSubLoading(true);

      let response = await toggleFollowUser(user.username, username);

      if (response.success) {
        setTargetUser((prev) => ({ ...prev, isFollow: !prev.isFollow }));
      }
    } catch (error) {
      addNotif({
        type: "danger",
        ...formatError(error),
      });
    } finally {
      setSubLoading(false);
    }
  };

  let actions = {
    toggleFollow,
  };

  return [targetUser, loading, subLoading, actions];
};

export default useFollowUser;
