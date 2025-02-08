import { GetUser } from "../Context/UserContext";
import useOptimistic from "../hooks/use-optimistic";
import { toggleLike, isLikedByUsername } from "../supabase/likes";
import LikeSection from "./LikeSection";
import CommentCount from "./CommentCount";
import { useCallback } from "react";

let BookState = ({ likes, comments, username, book }) => {
  let { user } = GetUser();

  let checkIsLiked = useCallback(async () => {
    return await isLikedByUsername(user.username, book);
  }, [book, user.username]);

  let handler = async () => {
    let { result } = await toggleLike(user.username, username, book);
    return result;
  };

  let [isLiked, likeAction, loading] = useOptimistic(checkIsLiked, handler);

  return (
    <section className="flex gap-2">
      <LikeSection
        likes={likes}
        isLiked={isLiked}
        username={username}
        toggleLike={() => likeAction((prev) => !prev)}
      />
      <CommentCount comments={comments.length} />
    </section>
  );
};

export default BookState;
