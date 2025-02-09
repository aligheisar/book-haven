import Loading from "../Components/Loading";
import { GetBookDetails } from "../Context/BookDetailsContext";
import BookImage from "../Components/BookImage";
import Title from "../Components/ui/Title";
import Description from "../Components/ui/Description";
import UserInfo from "../Components/UserInfo";
import Price from "../Components/ui/Price";
import BookState from "../Components/BookState";
import BookNotFound from "./BookNotFound";

let BookDetails = () => {
  let { data, error, pageLoading } = GetBookDetails();

  if (pageLoading) return <Loading />;
  if (error) return <BookNotFound />;

  return (
    <section className="flex flex-col">
      <header className="mx-auto flex h-96 w-fit gap-7 py-7">
        <BookImage url={data.imageUrl} />
        <div className="flex max-w-80 flex-col gap-5 py-3">
          <div className="flex flex-col gap-3">
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
            <Price>{data.price}</Price>
          </div>
          <div className="flex flex-col gap-3">
            <UserInfo />
            <BookState />
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
