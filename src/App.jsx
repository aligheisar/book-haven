import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./pages/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import BookDetails from "./pages/BookDetails";
import NewBookProvider from "./context/NewBookContext";
import BookDetailsProvider from "./context/BookDetailsContext";

let App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <ProtectedRoute from="/login" withUser>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute from="/register" withUser>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute from="/dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="users" element={<Users />}></Route>
        <Route path="users/:username" element={<UserProfile />} />
        <Route
          path="users/:username/:book"
          element={
            <BookDetailsProvider>
              <BookDetails />
            </BookDetailsProvider>
          }
        />
        <Route path="books" element={<Books />} />
        <Route
          path="new-book"
          element={
            <ProtectedRoute from="/new-book">
              <NewBookProvider>
                <NewBook />
              </NewBookProvider>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
