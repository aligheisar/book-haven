import { BrowserRouter } from "react-router-dom";
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
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

export default Providers;
