import GenreItem from "./ui/GenreItem";

let BookGenres = ({ genres }) => {
  return (
    <section>
      {genres.map((i) => (
        <GenreItem key={i}>{i}</GenreItem>
      ))}
    </section>
  );
};

export default BookGenres;
