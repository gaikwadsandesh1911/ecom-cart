import "./placeOrder.css";
import { useState } from "react";

const PlaceOrder = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // --------------------------------------------------------------------------------------------------

  const [errors, setErrors] = useState({});

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /\b\d{10}\b/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!isValidPhoneNumber(userData["phone"])) {
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
      // clear user form
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });
    }
  };

  // --------------------------------------------------------------------------------------------------

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Street"
          name="street"
          value={userData.street}
          onChange={handleChange}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={userData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            value={userData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2 className="title">Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p></p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p></p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b></b>
            </div>
          </div>
          <button type="submit">Proceed to checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
