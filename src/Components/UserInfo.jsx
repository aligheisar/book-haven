import { Link } from "react-router-dom";
import Button from "./ui/Button.tsx";
import { GetBookDetails } from "../Context/BookDetailsContext";
import { GetUser } from "../Context/UserContext";

let UserInfo = () => {
  let { user } = GetUser();

  let { data, toggleFollow } = GetBookDetails();

  return (
    <section className="flex h-10 w-fit items-center justify-center gap-2 fill-primary text-text">
      <Link to={`/users/${data.user.username}`}>
        <div className="flex items-center gap-2 rounded-full bg-surface p-1 pr-3">
          <img
            src={data.user.avatarUrl}
            className="size-7 rounded-full"
            alt="user"
          />
          <h3 className="w-fit text-nowrap">{data.user.fullName}</h3>
        </div>
      </Link>
      {user?.username !== data.user.username && (
        <Button
          onClick={toggleFollow}
          varient="outlined"
          className="relative h-fit rounded px-2 py-[2px] text-sm"
        >
          {data.isUserFollow ? "Following" : "Follow"}
        </Button>
      )}
    </section>
  );
};

export default UserInfo;
