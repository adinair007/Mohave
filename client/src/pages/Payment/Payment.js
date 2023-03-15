import React, { useState, useEffect } from "react";
import "../Payment/Payment.css";
import Header from "../../components/Header";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../axios";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../utils/reducer";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";

const Payment = () => {
  const [{ cart }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  function submitCheckout() {
    const productIds = [];

    cart.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
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
              <form>
                <CardElement onChange={handleChange} />
                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getCartTotal(cart)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button onClick={submitCheckout} disabled={processing || disabled || succeeded}>
                    <span> {processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Payment;
