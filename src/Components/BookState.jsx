import LikeSection from "./LikeSection";
import CommentCount from "./CommentCount";
import { GetBookDetails } from "../Context/BookDetailsContext";

let BookState = () => {
  let { toggleLike, data } = GetBookDetails();

  return (
    <section className="flex gap-2">
      <LikeSection
        likes={data.likes}
        isLiked={data.isUserLiked}
        toggleLike={toggleLike}
      />
      <CommentCount comments={data.comments.length} />
    </section>
  );
};

export default BookState;
