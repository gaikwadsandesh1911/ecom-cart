
import { axiosInstance } from "./axiosInstance.js";


export const loginUser = async (data) => {
  const response = await axiosInstance.post("/api/user/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/api/user/register", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/user/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/user/logout");
  return response.data;
};