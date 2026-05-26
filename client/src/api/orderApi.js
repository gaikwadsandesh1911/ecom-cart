import { axiosInstance } from "./axiosInstance";

export const placeOrder = async (data) => {
  const res = await axiosInstance.post("/api/order/place-order", data);
  return res?.data;
};


export const getMyOrders = async (pageParam=1) => {
    const res = await axiosInstance.get(`/api/order/my-orders?page=${pageParam}`);
    return res?.data
};