import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GetUser } from "../context/UserContext";
import Loading from "./Loading";

let ProtectedRoute = ({ children, from, to = "/", withUser }) => {
  let { user, loading } = GetUser();

  let location = useLocation();

  if (loading) return <Loading />;

  if (withUser && user && location.pathname === from)
    return <Navigate to={to} />;

  if (!withUser && !user && location.pathname === from)
    return <Navigate to={to} />;

  return children;
};

export default ProtectedRoute;
