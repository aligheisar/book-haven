import { BrowserRouter } from "react-router-dom";
import NetworkProvider from "./NetworkContext";
import NotifiProvider from "./NotifiContext";
import ModalProvider from "./ModalContext";
import UserProvider from "./UserContext";
import AuthProvider from "./AuthContext";

let Providers = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
      }}
    >
      <NetworkProvider>
        <NotifiProvider>
          <ModalProvider>
            <UserProvider>
              <AuthProvider>{children}</AuthProvider>
            </UserProvider>
          </ModalProvider>
        </NotifiProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
};

export default Providers;
