import { Link } from "react-router-dom";

let CustomLink = ({ to, children, closeFunc }) => {
  return (
    <Link
      onClick={closeFunc}
      className="rounded text-secondary-text transition-colors hover:bg-text/5"
      to={to}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
