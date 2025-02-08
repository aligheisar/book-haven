import { useEffect, useState } from "react";
import { getBookDetails } from "../supabase/books";

let useBookDetails = (username, book) => {
  const [BookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchBook = async () => {
      try {
        let response = await getBookDetails(username, book);
        if (response.success) {
          if (response.data) {
            setBookDetails({
              title: response.data.title,
              description: response.data.description,
              imageUrl: response.data.image_url,
              price: response.data.price,
              comments: response.data.comments,
              likes: response.data.likes.length,
            });
          } else {
            setError(true);
          }
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [username, book]);

  return [BookDetails, error, loading];
};

export default useBookDetails;
