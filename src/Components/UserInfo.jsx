import { Link } from "react-router-dom";
import useFollowUser from "../hooks/use-follow-user";
import Button from "./ui/Button.tsx";
import { Loading } from "./ui/Icons";

let UserInfo = ({ username }) => {
  let [targetUser, loading, subLoading, { toggleFollow }] =
    useFollowUser(username);

  return (
    <section className="flex w-fit items-center gap-3 fill-primary text-text">
      {loading ? (
        <Loading className="animate-spin" inher />
      ) : (
        <>
          <Link to={`/users/${username}`}>
            <div className="flex items-center gap-2 rounded-full bg-surface p-1 pr-3">
              <img
                src={targetUser.avatarUrl}
                className="size-7 rounded-full"
                alt="user"
              />
              <h3 className="w-fit text-nowrap">{targetUser.fullName}</h3>
            </div>
          </Link>
          <Button
            onClick={toggleFollow}
            disabled={subLoading}
            varient="outlined"
            className="relative h-fit rounded px-2 py-[2px] text-sm"
          >
            {subLoading && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loading inher size={14} className="animate-spin" />
              </span>
            )}
            {targetUser.isFollow ? "Following" : "Follow"}
          </Button>
        </>
      )}
    </section>
  );
};

export default UserInfo;
