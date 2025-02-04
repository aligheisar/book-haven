import BookImagePlaceholder from "./BookImagePlaceholder";

let BookImage = ({ url }) => {
  return (
    <section>
      {url ? (
        <img className="h-full w-full object-cover" src={url} alt="" />
      ) : (
        <BookImagePlaceholder />
      )}
    </section>
  );
};

export default BookImage;
