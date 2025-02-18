import { Link } from "react-router-dom";

let CustomLink = ({ to, children, closeFunc }) => {
  return (
    <Link onClick={closeFunc} className="text-secondary-text hover:bg-text/5 rounded transition-colors" to={to}>{children}</Link>
  )
}

export default CustomLink;