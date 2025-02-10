import { useNavigate } from "react-router-dom";
import { cn } from "../../util/cn.ts";
import GenreItem from "./GenreItem";

let GenreContainer = ({ className, removeHandler, genres, ...props }) => {
  let navigate = useNavigate();

  return (
    <section
      {...props}
      className={cn(
        "custom-scroll-light flex-1 overflow-y-auto rounded",
        className,
      )}
    >
      <div className="flex flex-wrap items-start gap-1">
        {genres.map((i) => (
          <GenreItem
            remove={removeHandler ? true : false}
            key={i}
            onClick={() =>
              removeHandler
                ? removeHandler(i)
                : navigate(`/books?genre=${encodeURIComponent(i)}`)
            }
          >
            {i}
          </GenreItem>
        ))}
      </div>
    </section>
  );
};

export default GenreContainer;
