import React, {useState, useEffect} from "react";
import "../Payment/Payment.css";
import Header from "../../components/Header";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const [{ cart }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event) => {

  }

  const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "Invalid")
  }

  return (
    <div>
      <Header />
      <div className="payment">
        <div className="payment_container">
          <h1>
            Checkout (<Link to="/checkout">{cart?.length} items</Link>)
          </h1>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
              <p>email</p>
              <p>123 Fire Lane</p>
              <p>Denton, TX</p>
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment_items">
              {cart.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          <div className="payment_section">
            <div className="payment_title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment_details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Payment;
