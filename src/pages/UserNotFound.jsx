import { Link } from "react-router-dom";
import Button from "../components/ui/Button.tsx";

let UserNotFound = () => {
  return (
    <main className="flex h-full w-full -translate-y-12 flex-col items-center justify-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-6xl text-primary">Not Found</h1>
        <p className="text-lg text-secondary-text opacity-80">
          we can't find this User
        </p>
      </div>
      <Link to="/">
        <Button varient="dim" className="text-base">
          Back to Home
        </Button>
      </Link>
    </main>
  );
};

export default UserNotFound;
