import App from "./App";
import Providers from "./Context/Providers";

let Root = () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};

export default Root;
