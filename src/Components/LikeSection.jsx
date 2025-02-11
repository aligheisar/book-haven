import { Like } from "./ui/Icons";

let LikeSection = ({ isLiked, likes, toggleLike }) => {
  return (
    <div
      onClick={toggleLike}
      className={`flex items-center gap-1 rounded-full px-1 py-[3px] pr-3 font-serif transition ${isLiked ? "bg-secondary-surface fill-text text-text" : "fill-secondary-text text-secondary-text hover:bg-secondary-surface/20"}`}
    >
      <span className="flex size-6 items-center justify-center text-sm">
        <Like inher size={24} />
      </span>
      {likes}
    </div>
  );
};

export default LikeSection;
