/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { io } from "socket.io-client";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  // ------------------------------------------------------------------------------------------------------

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  const [category, setCategory] = useState("");

  const [product_list, setProduct_list] = useState([]);

  const fetchProductList = async (currentPage, category) => {
    try {
      setIsError(false);
      setIsLoading(true);

      let res = await axios.get(`${backendUrl}/api/product/product-list`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          category: category,
        }, // whatever we send in params at server will recieve as query parameter
      });
      if (currentPage === 1) {
        setProduct_list(res.data?.productList);
      } else {
        setProduct_list((prev) => [...prev, ...res.data.productList]);
        // display prevPage products and concat currentPage products
      }

      setHasMore(res?.data?.productList.length > 0); //

      setTotalPages(res?.data?.totalPages);

      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const fetchMoreProductList = () => {
    setCurrentPage((prevPage) => prevPage + 1); // increase page number
  };

  useEffect(() => {
    fetchProductList(currentPage, category);
  }, [currentPage, category]);

  // -----------------------------------------------------------------------------------------------------------

  const [cartItems, setCartItems] = useState({});

  // signIn token
  const [token, setToken] = useState("");
  // -----------------------------------------------------------------------------------------------------------

  const addToCart = async (itemId) => {
    
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        `${backendUrl}/api/cart/add-to-cart`,
        { itemId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        },
      );
    }
  };

  // -----------------------------------------------------------------------------------------------------------

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        `${backendUrl}/api/cart/remove-from-cart`,
        { itemId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        },
      );
    }
  };

  // -----------------------------------------------------------------------------------------------------------

  const cartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      // for in => used to iterate over properties of an object
      if (cartItems[item] > 0) {
        let itemInfo = product_list.find((product) => product._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // -----------------------------------------------------------------------------------------------------------

  const fetchCartData = async (token) => {
    const { data } = await axios.get(`${backendUrl}/api/cart/cart-details`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log("cartData", data);
    setCartItems(data?.cartData);
  };

  // -----------------------------------------------------------------------------------------------------------

  // when refresh of webpage we will not logout. and also shows cartData fetching from db
  useEffect(() => {
    const localStorage_token = localStorage.getItem("token");
    if (localStorage_token) {
      setToken(localStorage_token);
      fetchCartData(localStorage_token); // calling fetchCartData() function if token is available
    }
  }, []);
  // ------------------------------------------------------------------------------------------socket connection

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io(backendUrl);
    setSocket(socketConnection);

    return () => socketConnection.close();
  }, []);

  // -----------------------------------------------------------------------------------------------------------

  const contextValue = {
    isLoading,
    isError,
    product_list,
    fetchMoreProductList,
    totalPages,
    hasMore,
    setHasMore,

    category,
    setCategory,
    setCurrentPage,

    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartTotalAmount,

    token,
    setToken,

    backendUrl,

    socket,
  };

  // -----------------------------------------------------------------------------------------------------------
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
