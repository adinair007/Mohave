import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { getCartTotal } from "../../utils/reducer";
import { useStateValue } from "../../StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Header from "../../components/Header";
import "./Payment.css";
// import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  // const [clientSecret, setClientSecret] = useState(true);

  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { clientSecret } = await fetch(
      `/payment/create?total=${Math.floor(getCartTotal(cart))}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          currency: "usd",
        }),
      }
    ).then((response) => response.json());

    const { paymentIntent } = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        alert("Payment Successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   // generate the special stripe secret which allows us to charge a customer
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       // Stripe expects the total in a currencies subunits
  //       url: `/payments/create?total=${getCartTotal(cart) * 100}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   getClientSecret();
  // }, [cart]);
  // console.log("THE SECRET IS >>>", clientSecret);
  // console.log("👱", user);
  // // const handleChange = (event) => {
  // //   setDisabled(event.empty);
  // //   setError(event.error ? event.error.message : "");
  // // };

  // const confirmPayment = async (event) => {
  //   event.preventDefault();

  //   await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then((result) => {
  //       alert("Payment Successful");
  //       navigate("/");
  //     })
  //     .catch((error) => console.log(error));
  // };

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
                <CardElement />
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
                    onClick={handleSubmit}
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
};
export default Payment;
