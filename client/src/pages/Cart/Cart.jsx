import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./cart.css";
import {
  removeFromCart,
  getCartDetails,
  decreaseCartQuantity,
  increaseCartQuantity,
} from "../../api/cartApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {

  // get cart details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartDetails,
  });

  // console.log("cartData", data);

  const [removingId, setRemovingId] = useState(null);

  const queryClient = useQueryClient();

  // remove from cart
  const { mutate: removeItem } = useMutation({
    mutationFn: removeFromCart,

    onMutate: (productId) => {
      setRemovingId(productId);
    },

    onSuccess: (data) => {
      // console.log("removeCart", data);
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(error);
    },

    onSettled: () => {
      setRemovingId(null);
    },

  });

  // increase quantity
  const { mutate: increaseQty } = useMutation({
    mutationFn: increaseCartQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  // decrease quantiy
  const { mutate: decreaseQty } = useMutation({
    mutationFn: decreaseCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const navigate = useNavigate();

  const cartItems = data?.cart || [];

  // console.log("cartItems", cartItems);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-container">
      {/* <h1 className="cart-title">Shopping Cart</h1> */}

      {cartItems.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item?.productId} className="cart-card">
                <img
                  src={item?.image?.url}
                  alt={item?.name}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h2>{item?.name}</h2>

                  <div className="price-section">
                    <p>₹{item?.finalPrice}</p>
                    <p>{item?.discount}%</p>
                    <p className="old-price">₹{item.price}</p>
                  </div>

                  <div className="quantity-container">
                    <button
                      onClick={() => decreaseQty(item?.productId)}
                      disabled={item?.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item?.quantity}</span>

                    <button
                      onClick={() => increaseQty(item?.productId)}
                      disabled={item?.quantity >= item?.stock || item?.quantity == 3}
                    >
                      +
                    </button>
                  </div>

                  {item.stock <= 10 && (
                    <small className="hurry-up">
                      Hurry only {item?.stock} products available
                    </small>
                  )}

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item?.productId)}
                    disabled={removingId === item?.productId}
                  >
                    {removingId === item?.productId ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{data?.cartCount}</span>
            </div>

            <div className="summary-row total">
              <span>Original Total</span>
              <span className="line-through">₹{data?.originalCartTotal}</span>
            </div>

            <div className="summary-row total">
              <span>Total Saving</span>
              <span className="free">₹{data?.totalSavings}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Final Total</span>
              <span>₹{data?.cartTotal}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/place-order")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
