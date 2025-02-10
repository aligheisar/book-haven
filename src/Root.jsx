import App from "./App";
import NotifiContainer from "./components/Notifi/NotifiContainer";
import Providers from "./Context/Providers";

let Root = () => {
  return (
    <Providers>
      <App />
      <NotifiContainer />
    </Providers>
  );
};

export default Root;
