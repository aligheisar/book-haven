import BookImagePlaceholder from "./BookImagePlaceholder";
import BookCoverContainer from "./ui/BookCoverContainer";

let BookImage = ({ url }) => {
  return (
    <BookCoverContainer className="h-40">
      {url ? (
        <img className="h-full w-full object-cover" src={url} alt="" />
      ) : (
        <BookImagePlaceholder />
      )}
    </BookCoverContainer>
  );
};

export default BookImage;
