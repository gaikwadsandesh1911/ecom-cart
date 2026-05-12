import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../context.js";

function UserContextProvider({ children }) {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
