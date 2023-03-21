import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import "./Signup.css";
import MojaveLogo from "../../assets/MojaveLogo2.png";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signup">
      <Link to="/">
        <img className="signup_logo" src={MojaveLogo} />
      </Link>
      <div className="signup_container">
        <h1>Create Account</h1>
        <form onSubmit={handleFormSubmit}>
          <h5>First Name</h5>
          <input
            className="form-input"
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
          />
          <h5>Last Name</h5>
          <input
            className="form-input"
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
          />
          <h5>Email</h5>
          <input
            className="form-input"
            placeholder="E-mail"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <h5>Password</h5>
          <input
            className="form-input"
            placeholder="Minimum of (5) characters"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="signup_button"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login">
          <button
            className="login_button"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Sign In!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
