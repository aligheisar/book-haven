import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserContext";
import AuthProvider from "./AuthContext";
import NotifiProvider from "./NotifiContext";
import NetworkProvider from "./NetworkContext";
import NewBookProvider from "./NewBookContex";

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
          <UserProvider>
            <AuthProvider>
              <NewBookProvider>{children}</NewBookProvider>
            </AuthProvider>
          </UserProvider>
        </NotifiProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
};

export default Providers;
