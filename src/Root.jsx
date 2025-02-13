import App from "./App";
import NotifiContainer from "./components/notifi/NotifiContainer";
import ModalRenderer from "./components/modal/ModalRenderer";
import Providers from "./context/Providers";

let Root = () => {
  return (
    <Providers>
      <App />
      <ModalRenderer />
      <NotifiContainer />
    </Providers>
  );
};

export default Root;
