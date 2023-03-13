import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";
import Header from "../../components/Header";
import { keys } from "@material-ui/core/styles/createBreakpoints";

const Orders = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <Header />
      <div className="orders">
        <h2>Viewing {userParam ? `${user.username}'s` : "your"} orders.</h2>
        {user.orders.map((order) => (
          <div key={order._id} className="order_container">
            <h3>
              {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
            </h3>
            <div className="order_info">
              {order.products.map(({_id, image, name, price}, index) => (
                <div key={index} className="product_info">
                  </div>
              ))}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
