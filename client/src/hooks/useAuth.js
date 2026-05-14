import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../api/userApi";

// -------------------------------------------------------------------------

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// -------------------------------------------------------------------------

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser
  });
};

// -------------------------------------------------------------------------

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser
  });
};

// -------------------------------------------------------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
};
// -------------------------------------------------------------------------
