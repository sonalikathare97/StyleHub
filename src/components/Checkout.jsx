import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: "/checkout" },
      });
    }
  }, [navigate]);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/[₹,]/g, "")),
    0
  );

  const deliveryCharge = subtotal >= 2000 ? 0 : 50;

  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    alert(
      `Thank you ${formData.name}! Your order has been placed successfully.`
    );

    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">

        <form
          className="checkout-details"
          onSubmit={handlePlaceOrder}
        >
          <h2>Delivery Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10 digit phone number"
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="checkout-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={formData.pincode}
              onChange={handleChange}
              pattern="[0-9]{6}"
              title="Enter a valid 6 digit PIN code"
              required
            />
          </div>

          <h2>Payment Method</h2>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Credit / Debit Card
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Cash on Delivery
            </label>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={cartItems.length === 0}
          >
            PLACE ORDER
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item, index) => (
            <div
              className="checkout-product"
              key={`${item.name}-${index}`}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}

          <hr />

          <div className="summary-line">
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>

            <span>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;