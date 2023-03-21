import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Header from "../../components/Header";
import CheckoutProduct from "../../pages/Checkout/CheckoutProduct";

const OrderHistory = () => {
    const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div>
      <Header />
      <div className="order_history">
        <h2>Viewing {user ? `${user.firstName}'s` : "your"} orders.</h2>
        {user?.orders ? user.orders.map((order) => (
          <div key={order._id} className="order_container">
            <h3>
              {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
            </h3>
            <div className="order_info">
              {order.products.map(({ _id, image, name, price }, product) => (
                <div key={product} className="product_info">
                  <CheckoutProduct
                     id={product._id}
                     title={product.name}
                     price={product.price}
                     image={product.image}
                     rating={5}
                   />
                </div>
              ))}
            </div>
          </div>)) : <div>No orders for this user.</div>}
      </div>
    </div>
  );
};

export default OrderHistory;
