import Button from "../Components/ui/Button.tsx";
import { GetNotifi } from "../Context/NotifiContext";

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
