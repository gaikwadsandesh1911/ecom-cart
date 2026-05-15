import { axiosInstance } from "./axiosInstance";

export const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get(
    `/api/product/product-list?page=${pageParam}`
  );
  return res.data;
};
