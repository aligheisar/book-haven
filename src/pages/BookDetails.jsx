import Loading from "../Components/Loading";
import { GetBookDetails } from "../Context/BookDetailsContext";
import BookImage from "../Components/BookImage";
import BookNotFound from "./BookNotFound";
import BookInformation from "../Components/BookInformation";

let BookDetails = () => {
  let { data, error, pageLoading } = GetBookDetails();

  if (pageLoading) return <Loading />;
  if (error) return <BookNotFound />;

  return (
    <section className="flex flex-col">
      <header className="mx-auto flex h-96 w-fit gap-6 py-7">
        <BookImage url={data.imageUrl} />
        <BookInformation data={data} />
      </header>
      <section>
        <div>add comment</div>
        <section>comments</section>
      </section>
    </section>
  );
};

export default BookDetails;
