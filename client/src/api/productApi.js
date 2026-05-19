import { axiosInstance } from "./axiosInstance";

export const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get(
    `/api/product/product-list?page=${pageParam}`
  );
  return res.data;
};


export const getProductDetails = async (id) => {
  const res = await axiosInstance.get(
    `/api/product/single-product/${id}`
  );
  return res.data;
};



