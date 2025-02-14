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
    if (!bookDetails) {
      fetchBook();
    }
  }, [fetchBook, bookDetails]);

  let toggleLikeBook = async () => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    setBookDetails((prev) => ({
      ...prev,
      isUserLiked: !prev.isUserLiked,
      likes: prev.isUserLiked ? prev.likes - 1 : prev.likes + 1,
    }));

    try {
      await toggleLike(bookDetails.id);
    } catch (error) {
      await fetchBook();
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

    setBookDetails((prev) => ({
      ...prev,
      isUserFollow: !prev.isUserFollow,
    }));

    try {
      await toggleFollow(targetUsername);
    } catch (error) {
      await fetchBook();
    }
  };

  let addBookComment = async (content) => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    if (!content.trim()) {
      addNotif({
        type: "warning",
        title: "Invalid Input",
        desc: "Please Enter a valid Comment",
      });
      return;
    }

    let prevState = bookDetails;

    let newComment = {
      id: nanoid(),
      createdAt: generateUTCTimestamp(),
      content: content,
      user: {
        fullName: user.fullName,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };

    setBookDetails((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));

    try {
      await addComment(bookDetails.id, content);
      await fetchBook();
    } catch (error) {
      setBookDetails(prevState);
    }
  };

  let removeBookComment = async (targetId) => {
    let prevState = bookDetails;

    setBookDetails((prev) => ({
      ...prev,
      comments: prev.comments.filter((i) => i.id !== targetId),
    }));

    try {
      await removeComment(targetId);
    } catch (error) {
      setBookDetails(prevState);
    }
  };

  let value = {
    data: bookDetails,
    error,
    pageLoading,
    toggleLike: toggleLikeBook,
    toggleFollow: toggleFollowUser,
    addBookComment,
    removeBookComment,
  };
  return (
    <BookDetailsContext.Provider value={value}>
      {children}
    </BookDetailsContext.Provider>
  );
};

export default BookDetailsProvider;
