import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import useBookDetails from "../hooks/use-book-details";
import BookImage from "../Components/BookImage";
import Title from "../Components/ui/Title";
import Description from "../Components/ui/Description";
import UserInfo from "../Components/UserInfo";

let BookDetails = () => {
  let { username, book } = useParams();

  let [data, error, loading] = useBookDetails(username, book);

  if (loading) return <Loading />;
  if (error) return <h1>we got a error</h1>;

  return (
    <section className="flex flex-col">
      <header className="mx-auto flex h-96 w-fit gap-7 py-7">
        <BookImage url={data.imageUrl} />
        <div className="flex max-w-72 flex-col gap-5 py-3">
          <div className="flex flex-col gap-3">
            <Title>{data.title}</Title>
            <Description>{data.description || "No description"}</Description>
          </div>
          <div className="flex flex-col gap-3">
            <UserInfo username={username} />
            <section>likes and comments</section>
          </div>
        </div>
      </header>
      <section>
        <div>add comment</div>
        <section>comments</section>
      </section>
    </section>
  );
};

export default BookDetails;
