import App from "./App";
import NotifiContainer from "./Components/Notifi/NotifiContainer";
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
