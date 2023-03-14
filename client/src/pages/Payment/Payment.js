import React from "react";
import "../Payment/Payment.css";
import Header from "../../components/Header";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

function Payment() {
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div>
      <Header />
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/checkout">{cart?.length} items</Link>)
          </h1>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>email</p>
              <p>123 Fire Lane</p>
              <p>Denton, TX</p>
            </div>
          </div>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
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

          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form></form>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Payment;
