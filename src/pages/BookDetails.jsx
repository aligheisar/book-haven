import Loading from "../components/Loading";
import { GetUser } from "../context/UserContext";
import { GetBookDetails } from "../context/BookDetailsContext";
import PageContainer from "../components/PageContainer";
import BookDetailsHeader from "../components/BookDetailsHeader";
import BookNotFound from "./BookNotFound";
import AddComment from "../components/AddComment";
import CommentSection from "../components/CommentSection";

let BookDetails = () => {
  let { data, error, pageLoading } = GetBookDetails();
  let { user } = GetUser();

  if (pageLoading) return <Loading />;
  if (error) return <BookNotFound />;

  let isOwner = user ? user.username === data.user.username : false;

  return (
    <PageContainer>
      <BookDetailsHeader data={data} isOwner={isOwner} />
      <section className="flex flex-col gap-2">
        <AddComment />
        <CommentSection comments={data.comments} />
      </section>
    </PageContainer>
  );
};

export default BookDetails;
