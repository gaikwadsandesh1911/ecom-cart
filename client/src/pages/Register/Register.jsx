import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="overlay">
      <div className="form">
        <form>
          <div>
            <input type="text" name="name" placeholder="name" />
          </div>
          <div>
            <input type="email" name="email" placeholder="email" />
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
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
          Already have an account <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
