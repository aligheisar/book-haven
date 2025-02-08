import { Like } from "./ui/Icons";

let LikeSection = ({ isLiked, likes, toggleLike }) => {
  return (
    <div
      onClick={toggleLike}
      className={`flex items-center gap-1 rounded-full px-1 py-1 pr-3 font-serif text-text transition ${isLiked ? "bg-secondary-surface fill-text" : "fill-secondary-text"}`}
    >
      <span className="flex size-6 items-center justify-center">
        <Like inher size={24} />
      </span>
      {likes}
    </div>
  );
};

export default LikeSection;
