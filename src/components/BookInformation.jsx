import BookState from "./BookState";
import Description from "./ui/Description";
import GenreContainer from "./ui/GenreContainer";
import Price from "./ui/Price";
import Title from "./ui/Title";
import UserInfo from "./UserInfo";

let BookInformation = ({ data }) => {
  return (
    <div className="flex max-w-80 flex-col justify-between gap-2 py-3">
      <div className="flex flex-col gap-2">
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        {data.genres && data.genres.length > 0 && (
          <GenreContainer className="max-h-14" genres={data.genres} />
        )}
        <Price>{data.price}</Price>
      </div>
      <div className="flex flex-col gap-2">
        <UserInfo />
        <BookState />
      </div>
    </div>
  );
};

export default BookInformation;
