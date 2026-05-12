import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
// import Footer from "./components/footer/Footer";
import VerifyOrder from "./pages/verifyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <>
      <div className="app">
        {/* <Navbar setShowLogin={setShowLogin}/> */}
        <Routes>

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/place-order" element={<PlaceOrder />} />

          <Route path="/verify-order" element={<VerifyOrder />} />
          
          <Route path="/my-orders" element={<MyOrders />} />

        </Routes>

      </div>
      {/* <Footer /> */}
      <ScrollToTopButton />
    </>
  );
};

export default App;
