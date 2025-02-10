import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import NewBook from "./pages/NewBook";
import NewBookProvider from "./Context/NewBookContext";
import BookDetails from "./pages/BookDetails";
import BookDetailsProvider from "./Context/BookDetailsContext";

let App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:username" element={<UserProfile />} />
        <Route
          path="users/:username/:book"
          element={
            <BookDetailsProvider>
              <BookDetails />
            </BookDetailsProvider>
          }
        />
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
