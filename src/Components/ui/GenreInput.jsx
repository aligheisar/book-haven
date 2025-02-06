import { GetNewBook } from "../../Context/NewBookContext";
import Input from "./Input.tsx";
import AutoCompelete from "./AutoCompelete";
import GenreContainer from "./GenreContainer";
import FormLable from "./FormLable";

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
    <div className="flex h-full flex-col gap-2">
      <FormLable>Genres</FormLable>
      <section className="flex h-full flex-col rounded-md bg-background/50 p-1">
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
    </div>
  );
};

export default GenreInput;
