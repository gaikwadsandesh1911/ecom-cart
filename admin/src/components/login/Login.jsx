import { useContext, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


import { AuthContext } from "../../context/authContext";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const {login, logout} = useContext(AuthContext);

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
      setLoading(true);
      const res = await login(formData.email, formData.password);
      console.log('loginform...', res);
      if(res?.data?.user?.role != "admin"){
        await logout();
        return
      }
      toast.success(res?.data?.message || "Login successful")
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
    finally{
      setLoading(false)
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
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
