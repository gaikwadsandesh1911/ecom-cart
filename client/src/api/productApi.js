import { axiosInstance } from "./axiosInstance";

export const fetchProducts = async ({
  pageParam = 1,
  search = "",
  category = "",
  sort = "",
}) => {

  console.log('productApi: =>',{category})
  const res = await axiosInstance.get(`/api/product/product-list`, {
    params: {
      page: pageParam,
      search,
      category,
      sort,
    },
  });
  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await axiosInstance.get(`/api/product/single-product/${id}`);
  return res.data;
};
