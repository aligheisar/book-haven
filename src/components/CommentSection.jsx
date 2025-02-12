import SectionTitle from "./SectionTitle";
import Comment from "./Comment";
import { GetUser } from "../context/UserContext";
import { GetBookDetails } from "../context/BookDetailsContext";

let CommentSection = ({ comments }) => {
  let { user } = GetUser();
  let { removeBookComment } = GetBookDetails();

  return (
    <section className="flex flex-col gap-2">
      <SectionTitle className="ml-1 text-left text-2xl">Comments</SectionTitle>
      <div className="flex flex-col gap-1">
        {comments && comments.length > 0 ? (
          comments.map((i) => (
            <Comment
              key={i.id}
              comment={i}
              currentUser={user}
              removeHandler={() => removeBookComment(i.id)}
            />
          ))
        ) : (
          <p className="text-center text-secondary-text opacity-80">
            there is no Comment
          </p>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
