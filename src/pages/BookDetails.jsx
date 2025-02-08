import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import useBookDetails from "../hooks/use-book-details";
import BookImage from "../Components/BookImage";

let BookDetails = () => {
  let { username, book } = useParams();

  let [data, error, loading] = useBookDetails(username, book);

  if (loading) return <Loading />;
  if (error) return <h1>we got a error</h1>;

  return (
    <section className="flex flex-col">
      <header className="flex h-96 gap-7 py-7">
        <BookImage url={data.imageUrl} />
        <div className="flex flex-col gap-6 py-3">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-5xl text-primary">{data.title}</h1>
            <p className="custom-scroll-light max-h-16 overflow-y-auto text-text opacity-80">
              {data.description || "no description"}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <section>author data</section>
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
