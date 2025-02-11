import { Link, useNavigate } from "react-router-dom";
import { cn } from "../util/cn.ts";
import BookImage from "./BookImage";

let BookCard = ({
  className,
  title,
  price,
  image,
  fullName,
  username,
  ...props
}) => {
  let navigate = useNavigate();

  let handleClick = () => {
    navigate(
      `/users/${encodeURIComponent(username)}/${encodeURIComponent(title)}`,
    );
  };

  return (
    <article
      onClick={handleClick}
      className={cn(
        "flex h-44 w-64 shrink-0 gap-2 rounded-lg bg-secondary-surface p-[6px]",
        className,
      )}
      {...props}
    >
      <BookImage url={image} />
      <div className="flex flex-col justify-between py-2 pb-3">
        <h3 className="font-serif text-xl text-text">{title}</h3>
        <div className="flex flex-col gap-1">
          <Link onClick={(e) => e.stopPropagation()} to={`/users/${username}`}>
            <p className="text-sm text-primary">{fullName}</p>
          </Link>
          <span className="font-serif text-sm text-text">${price}</span>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
