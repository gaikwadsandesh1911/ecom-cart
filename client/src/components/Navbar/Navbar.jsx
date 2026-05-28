import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../features/auth/authSlice.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/userApi.js";
import { toast } from "react-toastify";
import { getCartDetails } from "../../api/cartApi.js";

const Navbar = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      // console.log("logout data =>", data);

      // clear redux
      dispatch(clearUser());

      // clear cached current user
      queryClient.removeQueries({
        queryKey: ["current-user"],
      });

      // clear cache also
      queryClient.removeQueries({
        queryKey: ["cart"],
      });

      navigate("/", { replace: true });

      toast.success(data.message);
    },
    onError: (error) => {
      // console.log("logout error =>", error);
      toast.error(error);
    },
  });

  // cart count
  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartDetails,
    enabled: isAuthenticated, // if isAuthenticated then only this api runs
  });

  const totalItems = cartData?.cartCount || 0;
  // console.log('total...',totalItems);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar__logo">
          <Link to="/" className="logo">
            E-cart
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="navbar-right">
            <div className="navbar-search-icon">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="" />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </div>

            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" className="profile-icon" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/my-orders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />

                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
