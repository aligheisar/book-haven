import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import NotificationsButton from "./NotificationsButton";
import { Search } from "./ui/Icons";
import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import { GetUser } from "../context/UserContext";

let Navbar = () => {
  let { user } = GetUser();
  return (
    <nav className="fixed left-0 top-0 flex h-14 w-full items-center justify-between bg-surface px-11 text-text shadow-xl">
      <Link to="/">
        <h1 className="select-none font-serif text-4xl text-primary">
          Book Haven
        </h1>
      </Link>
      <Input
        varient="filled"
        placeholder="Search here"
        className="w-80"
        icon={<Search inher />}
      />
      {user ? (
        <div className="flex items-center gap-2">
          <NotificationsButton />
          <ProfileCard user={user} />
        </div>
      ) : (
        <ul className="flex list-none items-center gap-2">
          <li>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </li>
          <li className="select-none text-2xl text-primary">|</li>
          <li>
            <Link to="/register">
              <Button varient="outlined">Register</Button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
