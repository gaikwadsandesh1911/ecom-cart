import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/userApi";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      console.log('register +>',data)
      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return toast.error("Please fill all fields");
    }

    mutate(formData);
  };

  return (
    <div className="overlay">
      <div className="form" onSubmit={handleSubmit}>
        <form>
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={formData.password}
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
              {isPending ? "Registering..." : "Register"}
            </button>
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
