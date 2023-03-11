import React from "react";
import Subtotal from "../../components/Subtotal";
import "./Checkout.css";

function Checkout() {
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src="placeholder" alt="placeholder" />

        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
        <h2>Subtotal goes here</h2>
      </div>
    </div>
  );
}

export default Checkout;
