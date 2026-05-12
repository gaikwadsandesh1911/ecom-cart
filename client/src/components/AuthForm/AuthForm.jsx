function AuthForm({ type }) {
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
  return (
    <div className="overlay">
      <div>
        <div>{type === "login" ? "Login" : "Sign"}</div>
        <form onSubmit={}>
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
            <button type="submit">{type === 'login' ? "Login" : "Register"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
