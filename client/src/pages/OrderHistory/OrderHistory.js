import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../../utils/queries";

import Auth from "../../utils/auth";
import Header from "../../components/Header";
// import { keys } from "@material-ui/core/styles/createBreakpoints";

const OrderHistory = () => {
    const { data } = useQuery(QUERY_USER);
  let user

  if (!user?.firstName) {
    return window.location.replace("./login");
  }

  return (
    <div>
      <Header />
      <div className="order_history">
        <h2>Viewing {user ? `${user.firstName}'s` : "your"} orders.</h2>
        {/* {user.order_histroy.map((order) => (
          <div key={order._id} className="order_container">
            <h3>
              {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
            </h3>
            <div className="order_info">
              {order.products.map(({ _id, image, name, price }, index) => (
                <div key={index} className="product_info"></div>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default OrderHistory;
