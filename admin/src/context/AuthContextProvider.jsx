/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

function AuthContextProvider({ children }) {
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
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
    <AuthContext.Provider value={{ token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
