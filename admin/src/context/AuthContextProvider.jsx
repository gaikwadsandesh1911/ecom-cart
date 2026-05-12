/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        // console.log("checkAuth res", res);
        if (res?.data?.user?.role != "admin") {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }
        setUser(res?.data?.user);
        setIsAuthenticated(true);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // console.log("error:", error?.response);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  const logout = async () => {
    await axiosInstance.post("/api/user/logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    const res = await axiosInstance.post("/api/user/login", {
      email,
      password,
    });
    if (res?.data?.user?.role != "admin") {
      toast.error('only admin can login here')
      await logout();
      return;
    }
    setUser(res?.data?.user);
    setIsAuthenticated(true);
    return res;
  };

  
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
