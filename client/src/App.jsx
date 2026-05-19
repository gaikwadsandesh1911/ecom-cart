import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
// import Footer from "./components/footer/Footer";
import VerifyOrder from "./pages/verifyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./api/userApi";
import { useEffect } from "react";
import { clearUser, setUser } from "./features/auth/authSlice";
import ProtectedRoute from "./route/ProtectedRoute";
import GuestRoute from "./route/GuestRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

const App = () => {
  
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  // console.log('auth', user, isAuthenticated)

  const dispatch = useDispatch();

  // on refresh of page redux-store data is lost, because it memory based, but cookie is stored
  // so we call current-user
  const { data, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 0,
  });
  // console.log('data', data);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
    if (isError) {
      dispatch(clearUser());
    }
  }, [data, dispatch, isError]);


  // on login and register route don;t want show navbar
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <div className="app">
        {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Guest routes once user login will not manually access login and register route*/}
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected routes can not access following route without login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />

            <Route path="/place-order" element={<PlaceOrder />} />

            <Route path="/verify-order" element={<VerifyOrder />} />

            <Route path="/my-orders" element={<MyOrders />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
      <ScrollToTopButton />
    </>
  );
};

export default App;
