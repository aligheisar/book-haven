import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../supabase/user";
import { getBookDetails } from "../supabase/books";
import { toggleLike } from "../supabase/likes";
import { addComment, removeComment } from "../supabase/comments";
import { GetUser } from "./UserContext";
import { GetNotifi } from "./NotifiContext";
import { nanoid } from "nanoid";
import { generateUTCTimestamp } from "../util/format";

let BookDetailsContext = createContext();

export let GetBookDetails = () => useContext(BookDetailsContext);

let BookDetailsProvider = ({ children }) => {
  let { username: targetUsername, book: bookTitle } = useParams();

  let { addNotif } = GetNotifi();
  let { user } = GetUser();

  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [optimisticLoading, setOptimisticLoading] = useState({
    like: false,
    follow: false,
    comment: false,
  });
  const [commentContent, setCommentContent] = useState({
    value: "",
    error: null,
  });

  let fetchBook = useCallback(async () => {
    try {
      let { success, data } = await getBookDetails(targetUsername, bookTitle);
      if (success) {
        if (data) {
          setBookDetails(data);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      setError(true);
    } finally {
      setPageLoading(false);
    }
  }, [targetUsername, bookTitle]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  let handleAddCommentSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    if (!commentContent.value.trim()) {
      addNotif({
        type: "danger",
        title: "invalid Commnet",
        desc: "Comment field can't be empty",
      });
      setCommentContent({ value: "", error: null });
      return;
    }

    addBookComment();

    setCommentContent({ value: "", error: null });
  };

  let handleCommentChange = (e) => {
    let { value } = e.target;

    let error = null;
    if (!value.trim()) {
      error = "this field can't be empty";
    }
    setCommentContent({ value, error });
  };

  let toggleLikeBook = async () => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    setOptimisticLoading((prev) => ({ ...prev, like: true }));

    let prevState = bookDetails;

    setBookDetails((prev) => ({
      ...prev,
      isUserLiked: !prev.isUserLiked,
      likes: prev.isUserLiked ? prev.likes - 1 : prev.likes + 1,
    }));

    try {
      await toggleLike(bookDetails.id);
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading((prev) => ({ ...prev, like: false }));
    }
  };

  let toggleFollowUser = async () => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    setOptimisticLoading((prev) => ({ ...prev, follow: true }));

    let prevState = bookDetails;

    setBookDetails((prev) => ({
      ...prev,
      isUserFollow: !prev.isUserFollow,
    }));

    try {
      await toggleFollow(targetUsername);
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading((prev) => ({ ...prev, follow: false }));
    }
  };

  let addBookComment = async () => {
    setOptimisticLoading((prev) => ({ ...prev, comment: true }));

    let prevState = bookDetails;

    let newComment = {
      id: nanoid(),
      created_at: generateUTCTimestamp(),
      content: commentContent.value,
      user: {
        full_name: user.fullName,
        username: user.username,
        avatar_url: user.avatarUrl,
      },
    };

    setBookDetails((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));

    try {
      await addComment(bookDetails.id, commentContent.value);
      await fetchBook();
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading((prev) => ({ ...prev, comment: false }));
    }
  };

  let removeBookComment = async (targetId) => {
    let prevState = bookDetails;

    setOptimisticLoading((prev) => ({ ...prev, comment: true }));

    setBookDetails((prev) => ({
      ...prev,
      comments: prev.comments.filter((i) => i.id !== targetId),
    }));

    try {
      await removeComment(targetId);
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading((prev) => ({ ...prev, comment: false }));
    }
  };

  let value = {
    data: bookDetails,
    error,
    pageLoading,
    optimisticLoading,
    toggleLike: toggleLikeBook,
    toggleFollow: toggleFollowUser,
    commentContent,
    handleCommentChange,
    handleAddCommentSubmit,
    removeBookComment,
  };
  return (
    <BookDetailsContext.Provider value={value}>
      {children}
    </BookDetailsContext.Provider>
  );
};

export default BookDetailsProvider;
