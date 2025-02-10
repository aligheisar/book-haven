import App from "./App";
import NotifiContainer from "./components/notifi/NotifiContainer";
import Providers from "./context/Providers";

let Root = () => {
  return (
    <Providers>
      <App />
      <NotifiContainer />
    </Providers>
  );
};

export default Root;
