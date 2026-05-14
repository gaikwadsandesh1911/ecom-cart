import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, //  if using cookies
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('axosintrcptr error =>', error?.response)
    return Promise.reject(
      error?.response?.data?.message || "Something went wrong"
    );
  }
);

// ------------------------------------------------------


/* 

1.  we are using tanstack/query so we dont need try catch

2.  we also use axios response interceptor here

      so inside component onError we dont need to write full code like

      onError: (error) => {
        toast.error(error.response.data.message)
      }

      instead we use, inside component

      onError: (error) => {
        toast.error(error)
      }

*/


