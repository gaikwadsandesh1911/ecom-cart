import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/userApi";

import { useDispatch } from "react-redux";

import { setUser } from "../../features/auth/authSlice";


function Login() {

  
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // console.log("loginUser:", data);
      toast.success(data?.message || "Login successfull.");

      // dispatch to redux store
      dispatch(setUser(data.user));

      // clear form
      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    },
    onError: (error) => {
      // console.log("loginError", error);
      toast.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }
    mutate(formData);
  };

  return (
    <div className="overlay">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              id=""
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Loggin in..." : "Login"}
            </button>
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
