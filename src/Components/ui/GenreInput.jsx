import { GetNewBook } from "../../Context/NewBookContex";
import Input from "./Input.tsx";
import AutoCompelete from "./AutoCompelete";
import GenreContainer from "./GenreContainer";

let GenreInput = () => {
  let { genres, selectedGenres } = GetNewBook();

  return (
    <section className="rounded-md bg-background/50 p-1">
      <GenreContainer genres={selectedGenres} />
      <Input placeholder="input genre" className="rounded" />
      <div className="relative">
        <AutoCompelete inputItems={genres} />
      </div>
    </section>
  );
};

export default GenreInput;
