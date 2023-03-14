import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import reducer, { initialState } from "./utils/reducer";

const stripePromise = loadStripe('pk_test_51Mld1gIJwF9KWzHoI4T0inVn4m3RcY59m6VeMSajN5cFtsqmP4eXINTVuVjy2rSt0ZRESGQyMPfPLcXID8XIpWCc00OYlwBxbf')

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
