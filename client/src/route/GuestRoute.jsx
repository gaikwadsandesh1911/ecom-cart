import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function GuestRoute() {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default GuestRoute;
