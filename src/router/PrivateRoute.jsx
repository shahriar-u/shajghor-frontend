import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSec from "../Components/LoadingSec/LoadingSec";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSec />;
  }

  if (user) {
    return children;
  }

  
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
