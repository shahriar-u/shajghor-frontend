import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDecorator from "../hooks/useDecorator"; 
import LoadingSec from "../Components/LoadingSec/LoadingSec";
import Swal from "sweetalert2";

const DecoratorRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const [isDecorator, isDecoratorLoading] = useDecorator();

  if (loading || isDecoratorLoading) {
    return <LoadingSec />;
  }

  if (user && isDecorator) {
    return children;
  }

  if (user && !isDecorator) {
    logOut()
          .then(() => {
            Swal.fire({
              icon: "warning",
              title: "Access Denied!",
              text: "You are not a Decorator. Please login with correct account.",
              background: "#111827",
              color: "#fff",
              confirmButtonColor: "#FBBF24",
            });
          })
          .catch((err) => console.log(err));
  }


  return <Navigate to="/login" replace />;
};
export default DecoratorRoute;
