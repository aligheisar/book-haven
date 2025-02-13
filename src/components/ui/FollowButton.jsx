import Button from "./Button.tsx";

let FollowButton = ({ isFollow, toggleFollow }) => {
  return (
    <Button
      onClick={toggleFollow}
      varient="outlined"
      className="relative h-fit rounded px-2 py-[2px] text-sm"
    >
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
