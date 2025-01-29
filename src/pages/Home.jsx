import Button from "../Components/ui/Button.tsx";
import { GetNotifi } from "../Context/NotifiContext";

let Home = () => {
  let { addNotif } = GetNotifi();

  return (
    <section>
      <Button
        onClick={() =>
          addNotif({ title: "ali", desc: "new ali", type: "normal" })
        }
      >
        Add Notif
      </Button>
    </section>
  );
};

export default Home;
