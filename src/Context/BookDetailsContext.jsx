import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../supabase/user";
import { getBookDetails } from "../supabase/books";
import { toggleLike } from "../supabase/likes";
import { GetUser } from "./UserContext";
import { GetNotifi } from "./NotifiContext";

let BookDetailsContext = createContext();

export let GetBookDetails = () => useContext(BookDetailsContext);

let BookDetailsProvider = ({ children }) => {
  let { username: targetUsername, book: bookTitle } = useParams();

  let { addNotif } = GetNotifi();
  let { user } = GetUser();

  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [optimisticLoading, setOptimisticLoading] = useState(false);

  let toggleLikeBook = async () => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    let prevState = bookDetails;

    setOptimisticLoading(true);

    setBookDetails((prev) => ({
      ...prev,
      isUserLiked: !prev.isUserLiked,
      likes: prev.isUserLiked ? prev.likes - 1 : prev.likes + 1,
    }));

    try {
      await toggleLike(targetUsername, bookTitle);
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading(false);
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

    let prevState = bookDetails;

    setOptimisticLoading(true);

    setBookDetails((prev) => ({
      ...prev,
      isUserFollow: !prev.isUserFollow,
    }));

    try {
      await toggleFollow(targetUsername);
    } catch (error) {
      setBookDetails(prevState);
    } finally {
      setOptimisticLoading(false);
    }
  };

  let addComment = async () => {};

  let removeComment = async () => {};

  useEffect(() => {
    let fetchBook = async () => {
      try {
        let { success, data } = await getBookDetails(targetUsername, bookTitle);
        if (success) {
          if (data) {
            let {
              description,
              id,
              image_url,
              likes,
              isUserFollow,
              isUserLiked,
              price,
              title,
              user,
              comments,
              genres,
            } = data;
            setBookDetails({
              id,
              title,
              description,
              imageUrl: image_url,
              price,
              likes,
              isUserFollow,
              isUserLiked,
              comments,
              genres,
              user: {
                id: user.id,
                fullName: user.full_name,
                username: user.username,
                avatarUrl: user.avatar_url,
              },
            });
          } else {
            setError(true);
          }
        }
      } catch (error) {
        setError(true);
      } finally {
        setPageLoading(false);
      }
    };

    fetchBook();
  }, [targetUsername, bookTitle, user?.username]);

  let value = {
    data: bookDetails,
    error,
    pageLoading,
    optimisticLoading,
    toggleLike: toggleLikeBook,
    toggleFollow: toggleFollowUser,
  };
  return (
    <BookDetailsContext.Provider value={value}>
      {children}
    </BookDetailsContext.Provider>
  );
};

export default BookDetailsProvider;
