import { useEffect } from "react";
import { GetUser } from "../Context/UserContext";
import HorizontalSection from "./ui/HorizontalSection";
import BookCard from "./BookCard";

let UserBooks = () => {
  let { userBooks, fetchUserBooks } = GetUser();

  useEffect(() => {
    fetchUserBooks();
  }, [fetchUserBooks]);

  return (
    <HorizontalSection>
      {userBooks.map((i) => (
        <BookCard key={i.id} title={i.title} image={i.imageUrl} />
      ))}
    </HorizontalSection>
  );
};

export default UserBooks;
