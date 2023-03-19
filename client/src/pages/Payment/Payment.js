import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { getCartTotal } from "../../utils/reducer";
import { useStateValue } from "../../StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Header from "../../components/Header";
import axios from "../../axios";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ cart, address, user }, dispatch] = useStateValue();

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
        axios.post("/orders/add", {
          cart: cart,
          price: getCartTotal(cart),
          email: user?.email,
          address: address,
        });
        dispatch({
          type: "EMPTY_CART",
        });
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
              <p>{address.fullName}</p>
              <p>{address.userEmail}</p>
              <p>{address.userAddress}</p>
              <p>{address.userCity}</p>
              <p>{address.userState}</p>
              <p>{address.userZip}</p>
              <p>{address.userPhone}</p>
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
                </div>
                {/* {error && <div>{error}</div>} */}
              </form>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit}>
          <span>
            <strong>Buy Now</strong>
          </span>
        </button>
      </div>
    </div>
  );
};
export default Payment;
