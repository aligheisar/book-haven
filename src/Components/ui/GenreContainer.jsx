import { GetNewBook } from "../../Context/NewBookContex";
import { cn } from "../../util/cn.ts";
import GenreItem from "./GenreItem";

let GenreContainer = ({ className, genres, ...props }) => {
  let { handleRemoveGenre } = GetNewBook();

  return (
    <section
      {...props}
      className={cn("flex w-full flex-col gap-2 px-1", className)}
    >
      <label className="text-text">Genres</label>
      <div className="flex min-h-16 flex-wrap items-start gap-1 overflow-y-auto">
        {genres.map((i) => (
          <GenreItem key={i} onClick={() => handleRemoveGenre(i)}>
            {i}
          </GenreItem>
        ))}
      </div>
    </section>
  );
};

export default GenreContainer;
