import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container text-center mb-5">
        {/* {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )} */}
        <h4>Made by the Mojave Team 🐍.</h4>
      </div>
    </footer>
  );
};

export default Footer;
