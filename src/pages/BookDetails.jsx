import { useParams } from "react-router-dom";
import { getBookDetails } from "../supabase/books";
import { useEffect, useState } from "react";

let BookDetails = () => {
  let params = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    let fetchData = async () => {
      let response = await getBookDetails(params.username, params.title);
      setData(response);
    };

    fetchData();
  }, [params]);

  console.log(data);
  return <h1>book</h1>;
};

export default BookDetails;
