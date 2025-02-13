import { useEffect } from "react";
import { GetUser } from "../context/UserContext";
import HorizontalSection from "./ui/HorizontalSection";
import BooksLoading from "./BooksLoading";
import BookCard from "./BookCard";

let UserBooks = () => {
  let { user, userBooks, fetchUserBooks, userBooksLoading } = GetUser();

  useEffect(() => {
    fetchUserBooks();
  }, [fetchUserBooks, user]);

  return (
    <HorizontalSection>
      {userBooksLoading ? (
        <div className="flex h-44 w-full items-center justify-center">
          <BooksLoading />
        </div>
      ) : (
        userBooks &&
        userBooks.length > 0 &&
        userBooks.map((i) => (
          <BookCard
            className="bg-secondary-surface"
            key={i.id}
            title={i.title}
            price={i.price}
            image={i.imageUrl}
            fullName={i.fullName}
            username={i.username}
            bg="bg-background/70"
          />
        ))
      )}
    </HorizontalSection>
  );
};

export default UserBooks;
