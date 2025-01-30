import { createContext, useContext } from "react";
import useIsOnline from "../hooks/is-online";
import NoInternet from "../pages/NoInternet";

let NetworkContext = createContext();

export let GetNetwork = () => useContext(NetworkContext);

let NetworkProvider = ({ children }) => {
  let { isOnline, setIsOnline } = useIsOnline();

  if (!isOnline) return <NoInternet />;
  return (
    <NetworkContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
