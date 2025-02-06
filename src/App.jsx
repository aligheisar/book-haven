import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashbord from "./pages/Dashbord";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import NewBook from "./pages/NewBook";
import NewBookProvider from "./Context/NewBookContext";

let App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashbord" element={<Dashbord />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:username" element={<UserProfile />} />
        <Route
          path="new-book"
          element={
            <NewBookProvider>
              <NewBook />
            </NewBookProvider>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
