import { Navigate } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import LoadingSec from "../Components/LoadingSec/LoadingSec";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(
    isAdmin, user
  );
  
  if (loading || isAdminLoading) {
    return <LoadingSec />;
  }

  if (user && isAdmin) {
    return children;
  }

  if (user && !isAdmin) {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "warning",
          title: "Access Denied!",
          text: "You are not an Admin. Please login with correct account.",
          background: "#111827",
          color: "#fff",
          confirmButtonColor: "#FBBF24",
        });
      })
      .catch((err) => console.log(err));
  }

  
  return <Navigate to="/login" replace />;
};

export default AdminRoute;