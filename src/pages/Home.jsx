import Button from "../components/ui/Button.tsx";
import { GetNotifi } from "../context/NotifiContext";

let Home = () => {
  let { addNotif } = GetNotifi();

  return (
    <>
      <Button
        onClick={() =>
          addNotif({ title: "ali", desc: "new ali", type: "normal" })
        }
      >
        Add Notif
      </Button>
    </>
  );
};

export default Home;
