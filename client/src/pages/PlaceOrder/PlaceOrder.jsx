import "./placeOrder.css";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCartDetails } from "../../api/cartApi.js";
import { placeOrder } from "../../api/orderApi.js";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartDetails,
  });
  console.log("cart-data", data);

  const { mutate, isPending } = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      console.log("placeOrder success :", data);
      toast.success(data.message);
      queryClient.removeQueries({
        queryKey: ["cart"],
      });

      // clear user form
      setAddress({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });

      navigate("/my-orders");
    },
    onError: (error) => {
      console.log("placeOrder error", error);
      toast.error(error);
    },
  });

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --------------------------------------------------------------------------------------------------

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /\b\d{10}\b/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!isValidPhoneNumber(address.phone)) {
      newErrors.phone = "Please enter 10 digit valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = validateForm();

    if (isValidForm) {
      mutate({
        address,
        paymentMethod,
      });
    }
  };

  // --------------------------------------------------------------------------------------------------

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Street"
          name="street"
          value={address.street}
          onChange={handleChange}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            value={address.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <p className="title">Order Summary</p>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{data?.cartCount}</span>
          </div>

          <div className="summary-row">
            <span>Original Total</span>
            <span className="line-through">{data?.originalCartTotal}</span>
          </div>

          <div className="summary-row">
            <span>Final Price</span>
            <span>₹{data?.cartTotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span className="free">Free</span>
          </div>

          <div className="summary-row">
            <span>Total Saving</span>
            <span className="free">{data?.totalSavings}</span>
          </div>

          <hr />

          <div className="summary-row grand-total">
            <span>Total Amount</span>
            <span>₹{data?.cartTotal}</span>
          </div>

          <div className="payment-section">
            <p className="payment-title">Payment Method</p>

            <div
              className={
                paymentMethod === "COD"
                  ? "payment-option active"
                  : "payment-option"
              }
              onClick={() => setPaymentMethod("COD")}
            >
              <input type="radio" checked={paymentMethod === "COD"} readOnly />

              <span>Cash On Delivery</span>
            </div>

            <div className="payment-option disabled">
              <input type="radio" disabled />

              <span>Razorpay (Coming Soon)</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || data?.cart?.length === 0}
          >
            {isPending ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
