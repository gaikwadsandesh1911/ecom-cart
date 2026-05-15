import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../features/auth/authSlice.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/userApi.js";
import { toast } from "react-toastify";

const Navbar = () => {
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

      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      console.log("logout error =>", error);
      toast.error(error);
    },
  });

  const { isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="logo">
          EcomCart
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            {/* <div className={cartTotalAmount() > 0 ? "dot" : ""}></div> */}
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
  );
};

export default Navbar;
