import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./cart.css";
import { deleteCartItem, getCartDetails } from "../../api/cartApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  // get cart details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartDetails,
  });
  console.log("cartData", data);

  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending: removeLoading } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (data) => {
      console.log("removeCart", data);
      toast.success(data.message);

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
  
  console.log("cartItems", cartItems);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-card">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h2>{item.name}</h2>

                  <div className="price-section">
                    <p>₹{item.finalPrice}</p>
                    <p>{item.discount}%</p>
                    <p className="old-price">₹{item.price}</p>
                  </div>

                  <div className="quantity-container">
                    <button>-</button>

                    <span>{item.quantity}</span>

                    <button>+</button>
                  </div>

                  {item.stock <= 10 && (
                    <small className="hurry-up">
                      Hurry only {item.stock} products available
                    </small>
                  )}

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.productId)}
                    disabled={removeLoading}
                  >
                    {removeLoading ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row total">
              <span>Original Total</span>
              <span className="line-through">₹{data?.originalCartTotal}</span>
            </div>

            <div className="summary-row total">
              <span>Final Total</span>
              <span>₹{data?.cartTotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total Saving</span>
              <span className="free">₹{data?.totalSavings}</span>
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
