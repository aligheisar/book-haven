import { Link } from "react-router-dom";
import { timeAgo } from "../util/format";
import { Trash } from "./ui/Icons";
import { Fragment } from "react";

let Comment = ({ comment, currentUser, removeHandler }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-surface p-3">
      <div className="flex justify-between">
        <Link to={`/users/${comment.user.username}`}>
          <div className="flex h-6 items-center gap-2">
            <img
              draggable={false}
              className="h-full rounded-full"
              src={comment.user.avatarUrl}
              alt={comment.user.fullName}
            />
            <h3 className="text-sm text-text opacity-80">
              {comment.user.username === currentUser?.username
                ? "You"
                : comment.user.fullName}
            </h3>
          </div>
        </Link>
        <div className="mr-1 flex items-center gap-2">
          {currentUser?.username === comment.user.username && (
            <span
              className="cursor-pointer rounded-sm fill-secondary-text p-1 transition-colors hover:bg-text/5 hover:fill-danger"
              onClick={removeHandler}
            >
              <Trash size={14} inher />
            </span>
          )}
          <span className="text-sm text-secondary-text opacity-70">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
      </div>
      <p className="p-1 text-text">
        {comment.content.split("\n").map((i, index) => (
          <Fragment key={index}>
            {i}
            <br />
          </Fragment>
        ))}
      </p>
    </div>
  );
};

export default Comment;
