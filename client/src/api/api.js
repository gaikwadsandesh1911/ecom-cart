/* eslint-disable preserve-caught-error */
import { axiosInstance } from "./axiosInstance.js";


export const registerUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/api/user/register", userData);
    return data;
  } catch (error) {
    const message = error?.response?.data?.message ||  "Registration failed";
    throw new Error(message);
  }
};


export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/api/user/login", userData);
    return data;
  } catch (error) {
    const message = error?.response?.data?.message ||  "Login failed";
    throw new Error(message);
  }
};
