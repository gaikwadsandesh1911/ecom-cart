import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <div className="navbar">
      <div className="heading">
        <h1>E-cart</h1>
        <p>admin</p>
      </div>
      {isAuthenticated && (
        <div>
          <button onClick={logoutHandler} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
