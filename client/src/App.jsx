import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./api/userApi";
import { useEffect } from "react";
import { clearUser, setUser } from "./features/auth/authSlice";

import ProtectedRoute from "./route/ProtectedRoute";
import GuestRoute from "./route/GuestRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Loader from "./components/loader/Loader";

const App = () => {

  const { authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // on refresh of page redux-store data is lost, because it memory based, but cookie is stored
  // so we call current-user

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 0,
  });
  // console.log('data', data);

  useEffect(() => {
    
    if(isLoading) return;

    if (data?.user) {
      dispatch(setUser(data.user));
    }
    else{
      dispatch(clearUser());
    }
  }, [data, dispatch, isLoading, isError]);

  // on login and register route don;t want show navbar
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  if(authLoading || isLoading) {
    return <Loader/>
  }

  return (
    <>
      <div className="app">
         {!shouldHideNavbar && <Navbar />}
        <div className={!shouldHideNavbar ? "page-container" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Guest routes once user login will not manually access login and register route*/}
            <Route element={<GuestRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected routes can not be accessed without login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Route>
          </Routes>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default App;


/*  
    Login/Register → shouldHideNavbar=true → no page-container → overlay becomes full width
    Home/Product/Cart → page-container applied automatically 
*/
