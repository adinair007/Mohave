import React from "react";
import Header from "../../components/Header";
import Subtotal from "../../components/Subtotal";
import "./Checkout.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ cart }, dispatch] = useStateValue();
  return (
    <div>
      <Header />
      <div className="checkout">
        <div className="checkout__left">
          <img className="checkout__ad" src="placeholder" alt="placeholder" />

          <div>
            <h2 className="checkout__title">Your Shopping Cart</h2>

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

        <div className="checkout__right">
          <Subtotal />
          <h2>Subtotal goes here</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
