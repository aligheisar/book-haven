import { Link } from "react-router-dom";
import Button from "../Components/ui/Button.tsx";

let NotFound = () => {
  return (
    <section className="grid h-full w-full -translate-y-12 place-content-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-6xl text-primary">404</h1>
        <p className="text-lg text-secondary-text opacity-80">
          page not Found !
        </p>
      </div>
      <Link to="/">
        <Button varient="dim" className="text-base">
          Back to Home
        </Button>
      </Link>
    </section>
  );
};

export default NotFound;
