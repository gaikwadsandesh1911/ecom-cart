import { useContext, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from 'react-router-dom'

import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/authContext";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const {login} = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/api/user/login`, formData);
      console.log("login response", data);
      const decoded = jwtDecode(data?.token);
      console.log('decoded', decoded)
      if(decoded.userRole !== "admin"){
        setFormData({email: "", password: ""})
        toast.error("Only Admin can login here!")
        navigate("/")
        return
      }
      login(data?.token)
      navigate("/admin");
      setFormData({
        email: "",
        password: ""
      })
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      // backend error messages
      console.log("login error", message);
      toast.error(message);
    }
  };

  return (
    <div className="overlay">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
