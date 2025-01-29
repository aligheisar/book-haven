import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthContext";
import NotifiProvider from "./NotifiContext";

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
      <NotifiProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotifiProvider>
    </BrowserRouter>
  );
};

export default Providers;
