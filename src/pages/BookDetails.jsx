import Loading from "../components/Loading";
import { GetBookDetails } from "../context/BookDetailsContext";
import BookImage from "../components/BookImage";
import BookNotFound from "./BookNotFound";
import BookInformation from "../components/BookInformation";
import AddComment from "../components/AddComment";
import CommentSection from "../components/CommentSection";
import BookDetailMenu from "../components/BookDetailsMenu";

let BookDetails = () => {
  let { data, error, pageLoading } = GetBookDetails();

  if (pageLoading) return <Loading />;
  if (error) return <BookNotFound />;

  return (
    <section className="mx-auto flex max-w-[720px] flex-col">
      <header className="relative mx-auto flex h-96 w-fit gap-6 py-7">
        <BookDetailMenu />
        <BookImage url={data.imageUrl} />
        <BookInformation data={data} />
      </header>
      <section className="flex flex-col gap-2">
        <AddComment />
        <CommentSection comments={data.comments} />
      </section>
    </section>
  );
};

export default BookDetails;
