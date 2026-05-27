import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function GuestRoute() {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default GuestRoute;
