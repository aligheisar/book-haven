import BookImagePlaceholder from "./BookImagePlaceholder";
import BookCoverContainer from "./ui/BookCoverContainer";

let BookImage = ({ url, bg = "bg-background/60" }) => {
  return (
    <BookCoverContainer>
      {url ? (
        <img
          draggable={false}
          className="h-full w-full object-cover"
          src={url}
          alt=""
        />
      ) : (
        <BookImagePlaceholder bg={bg} />
      )}
    </BookCoverContainer>
  );
};

export default BookImage;
