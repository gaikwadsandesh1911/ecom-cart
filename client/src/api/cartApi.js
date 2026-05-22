import { axiosInstance } from "./axiosInstance.js";

export const addToCart = async (productId) => {
  const res = await axiosInstance.post(
    `/api/cart/${productId}`
  );
  return res.data;
};

export const getCartDetails = async () => {
  const res = await axiosInstance.get(
    `/api/cart`
  );
  return res.data;
};

export const deleteCartItem = async (productId) => {
  const res = await axiosInstance.delete(
    `/api/cart/${productId}`
  );

  return res.data;
};