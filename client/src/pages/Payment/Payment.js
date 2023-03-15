import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { getCartTotal } from "../../utils/reducer";
import { useStateValue } from "../../StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Header from "../../components/Header";
import "./Payment.css";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState("");

  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await axios.post("/payment/create", {
        amount: getCartTotal(cart),
      });

      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientSecret is >>>>", clientSecret);
  }, []);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const confirmPayment = async (event) => {
    event.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        alert(("Payment Successful"))
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

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
                  <button
                    onClick={confirmPayment}
                    // disabled={processing || disabled || succeeded}
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
                {/* {error && <div>{error}</div>} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;

//   const [{ cart }, dispatch] = useStateValue();

//   const stripe = useStripe();
//   const elements = useElements();

//   const [succeeded, setSucceeded] = useState(false);
//   const [processing, setProcessing] = useState("");

//   const [error, setError] = useState(null);
//   const [disabled, setDisabled] = useState(true);

//   const [clientSecret, setClientSecret] = useState(true);
