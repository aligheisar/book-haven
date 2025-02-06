import { GetNewBook } from "../../Context/NewBookContext";
import { cn } from "../../util/cn.ts";
import GenreItem from "./GenreItem";

let GenreContainer = ({ className, genres, ...props }) => {
  let { handleRemoveGenre } = GetNewBook();

  return (
    <section
      {...props}
      className={cn(
        "custom-scroll-light mb-1 max-h-[140px] flex-1 overflow-y-auto rounded",
        className,
      )}
    >
      <div className="flex flex-wrap items-start gap-1">
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
