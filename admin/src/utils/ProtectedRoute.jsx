import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <p>Loading...</p>;
  }
  /* if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children; */

  return isAuthenticated ? children : <Navigate to='/login' />

  // <Navigate to={isAuthenticated ? "/admin" : "/login"} replace />;
}

export default ProtectedRoute;
