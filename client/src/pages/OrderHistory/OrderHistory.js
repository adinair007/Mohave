import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import HeaderTwo from "../../components/HeaderTwo";
import CheckoutProduct from "../../pages/Checkout/CheckoutProduct";
import "./OrderHistory.css"

const OrderHistory = () => {
  const { loading, error, data } = useQuery(QUERY_USER);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      fetch(`/orders/get?email=${data.user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      // query: JSON.stringify({ email: data.user.email }),
      })
        .then((response) => response.json())
        .then((data) => setOrders(data));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { user } = data;

  return (
    <div>
      <HeaderTwo />
      <div className="order_history">
        <h2>Viewing {user ? `${user.email}'s` : "your"} orders.</h2>
        {user?.orders ? (
          user.orders.map((order) => (
            <div key={order._id} className="order_container">
              <h3>
                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
              </h3>
              <div className="order_info">
                {order.products.map((product) => (
                  <div key={product._id} className="product_info">
                    <CheckoutProduct
                      id={product._id}
                      title={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No orders for this user.</div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
