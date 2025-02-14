import { Link } from "react-router-dom";
import FollowButton from "./ui/FollowButton";
import { GetBookDetails } from "../context/BookDetailsContext";
import { GetUser } from "../context/UserContext";

let UserInfo = () => {
  let { user } = GetUser();

  let { data, toggleFollow } = GetBookDetails();

  return (
    <section className="flex h-10 w-fit items-center justify-center gap-2 fill-primary text-text">
      <Link to={`/users/${data.user.username}`}>
        <div className="flex items-center gap-2 rounded-full bg-surface p-1 pr-3">
          <img
            draggable={false}
            src={data.user.avatarUrl}
            className="size-7 rounded-full"
            alt="user"
          />
          <h3 className="w-fit text-nowrap">{data.user.fullName}</h3>
        </div>
      </Link>
      {user?.username !== data.user.username && (
        <FollowButton
          isFollow={data.isUserFollow}
          toggleFollow={toggleFollow}
        />
      )}
    </section>
  );
};

export default UserInfo;
