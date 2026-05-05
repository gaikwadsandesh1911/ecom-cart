import { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="heading">
        <h1>Ecom cart</h1>
        <p>admin</p>
      </div>
      {token && (
        <div>
          <button onClick={logoutHandler} className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
