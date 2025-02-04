import { GetNewBook } from "../../Context/NewBookContex";
import Input from "./Input.tsx";
import AutoCompelete from "./AutoCompelete";
import GenreContainer from "./GenreContainer";

let GenreInput = () => {
  let {
    loadingGenres,
    filteredGenres,
    selectedGenres,
    handleGenreInputChange,
    genreInput,
    handleGenreInputFocus,
    handleGenreInputBlur,
  } = GetNewBook();

  return (
    <section className="rounded-md bg-background/50 p-1">
      <GenreContainer genres={selectedGenres} />
      <Input
        placeholder="input genre"
        disabled={loadingGenres}
        value={genreInput}
        onChange={handleGenreInputChange}
        onFocus={handleGenreInputFocus}
        onBlur={handleGenreInputBlur}
        className="rounded"
      />
      <div className="relative">
        <AutoCompelete genres={filteredGenres} />
      </div>
    </section>
  );
};

export default GenreInput;
