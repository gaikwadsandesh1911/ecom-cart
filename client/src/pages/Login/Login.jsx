import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import "./login.css";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="overlay">
      <div className="form">
        <form>
          <div>
            <input type="text" name="email" id="" placeholder="email" />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>

        <p>
          Don't have an account <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
