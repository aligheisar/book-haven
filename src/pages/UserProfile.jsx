import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toggleFollow, userPagebyUsername } from "../supabase/user";
import { GetUser } from "../context/UserContext";
import { GetNotifi } from "../context/NotifiContext";
import UserProfileHeader from "../components/UserProfileHeader";
import PageContainer from "../components/PageContainer";
import GridSection from "../components/GridSection";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import UserNotFound from "./UserNotFound";

let UserProfile = () => {
  let { username: targetUsername } = useParams();

  let { user } = GetUser();
  let { addNotif } = GetNotifi();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let fetchUserData = useCallback(async () => {
    try {
      let { success, data } = await userPagebyUsername(targetUsername);
      if (success && data) {
        let {
          username,
          full_name,
          avatar_url,
          followers_count,
          following_count,
          is_following,
          books,
        } = data;
        setUserData({
          fullName: full_name,
          username,
          avatarUrl: avatar_url,
          followers: followers_count,
          following: following_count,
          isUserFollow: is_following,
          books: books.map((i) => ({
            title: i.title,
            imageUrl: i.image_url,
            price: i.price,
            user: {
              username: i.user.username,
              fullName: i.user.full_name,
            },
          })),
        });
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [targetUsername]);

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [userData, fetchUserData]);

  let toggleFollowUser = async () => {
    if (!user) {
      addNotif({
        type: "warning",
        title: "Your not Logged in",
        desc: "Please first login to your account",
      });
      return;
    }

    let prevState = userData;

    setUserData((prev) => ({
      ...prev,
      isUserFollow: !prev.isUserFollow,
      followers: prev.isUserFollow ? prev.followers - 1 : prev.followers + 1,
    }));

    try {
      await toggleFollow(targetUsername);
    } catch (error) {
      setUserData(prevState);
    }
  };

  if (loading) return <Loading />;
  if (error) return <UserNotFound />;

  return (
    <PageContainer>
      <UserProfileHeader
        toggleFollowUser={toggleFollowUser}
        data={userData}
        user={user}
      />
      <GridSection>
        {userData.books && userData.books.length > 0 ? (
          userData.books.map((i) => (
            <BookCard
              key={i.title}
              fullName={i.user.fullName}
              image={i.imageUrl}
              price={i.price}
              title={i.title}
              username={i.user.username}
              bg="bg-background"
            />
          ))
        ) : (
          <p className="w-full pt-6 text-center text-secondary-text/60">
            No book available
          </p>
        )}
      </GridSection>
    </PageContainer>
  );
};

export default UserProfile;
