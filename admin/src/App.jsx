import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductList from "./pages/productList/ProductList";
import Orders from "./pages/productOrders/Orders";
import ProtectedRoute from "./utils/ProtectedRoute";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/admin" : "/login"} />}
        />
        {/* Login */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route index element={<ProductList />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
