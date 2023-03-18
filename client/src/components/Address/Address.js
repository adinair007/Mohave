import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "../Address/address.css";
import Header from "../Header";

function Address() {
  const [{}, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userCity, setCity] = useState("");
  const [userState, setState] = useState("");
  const [userZip, setZip] = useState("");
  const [userPhone, setPhone] = useState("");

  const proceed = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_ADDRESS",
      item: {
        fullName,
        userEmail,
        userAddress,
        userCity,
        userState,
        userZip,
        userPhone,
      },
    });

    navigate("/payment");
  };

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Shipping Address</h1>
      </div>
      <div className="main__container">
        <div className="form__container">
          <div className="input__container">
            <p>Full Name</p>
            <input
              type="text"
              placeholder="John Smith"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>
          <div className="input__container">
            <p>Email</p>
            <input
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={userEmail}
            />
          </div>
          <div className="input__container">
            <p>Address</p>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={userAddress}
            />
          </div>
          <div className="input__container">
            <p>City</p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={userCity}
            />
          </div>
          <div className="input__container">
            <p>State</p>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={userState}
            />
          </div>
          <div className="input__container">
            <p>Zip Code</p>
            <input
              type="text"
              onChange={(e) => setZip(e.target.value)}
              value={userZip}
            />
          </div>
          <div className="input__container">
            <p>Phone Number</p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={userPhone}
            />
          </div>
          <button onClick={proceed}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Address;
