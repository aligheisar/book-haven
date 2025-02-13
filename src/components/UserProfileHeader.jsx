import UserAvatar from "./UserAvatar";
import FollowButton from "./ui/FollowButton";

let UserProfileHeader = ({ data, user, toggleFollowUser }) => {
  return (
    <header className="flex items-center justify-between gap-5 py-7">
      <div className="flex items-center gap-8">
        <UserAvatar url={data.avatarUrl} />
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-serif text-3xl text-text">
            {data.fullName}
          </h2>
          <p className="mb-1 text-center text-primary">{data.username}</p>
          {user?.username !== data.username && (
            <FollowButton
              toggleFollow={toggleFollowUser}
              isFollow={data.isUserFollow}
            />
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <p className="flex flex-col-reverse items-center gap-1 rounded-md bg-surface p-2 text-text">
          books
          <span className="font-serif text-xl text-primary drop-shadow-md">
            {data.books.length}
          </span>
        </p>
        <p className="flex flex-col-reverse items-center gap-1 rounded-md bg-surface p-2 text-text">
          followers
          <span className="font-serif text-xl text-primary drop-shadow-md">
            {data.followers}
          </span>
        </p>
        <p className="flex flex-col-reverse items-center gap-1 rounded-md bg-surface p-2 text-text">
          following
          <span className="font-serif text-xl text-primary drop-shadow-md">
            {data.following}
          </span>
        </p>
      </div>
    </header>
  );
};

export default UserProfileHeader;
