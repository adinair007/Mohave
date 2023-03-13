import React from "react";
import "../Payment/Payment.css";
import Header from "../../components/Header";

function Payment() {
  return (
    <div>
      <Header />
      <div className="payment">
        <div className="payment__container">
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p></p>
            </div>
          </div>
          <div className="payment__section"></div>
          <div className="payment__section"></div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Payment;
