import { Link } from "react-router-dom";
import { cn } from "../util/cn.ts";
import BookImage from "./BookImage";

let BookCard = ({
  className,
  title,
  price,
  image,
  author,
  username,
  ...props
}) => {
  return (
    <article
      className={cn("flex gap-2 bg-secondary-surface", className)}
      {...props}
    >
      <BookImage url={image} />
      <div className="flex flex-col justify-between">
        <h3 className="font-serif text-xl text-primary">{title}</h3>
        <div>
          <Link to={`/users/${username}`}>
            <p className="text-secondary-text">{author}</p>
          </Link>
          <span className="text-sm text-text">{price}</span>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
