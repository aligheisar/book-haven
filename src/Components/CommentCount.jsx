import { Comment } from "./ui/Icons";

let CommentCount = ({ comments }) => {
  return (
    <div className="flex items-center gap-1 rounded-full fill-secondary-text px-1 font-serif text-text">
      <span className="flex size-6 items-center justify-center">
        <Comment inher size={20} />
      </span>
      {comments}
    </div>
  );
};

export default CommentCount;
