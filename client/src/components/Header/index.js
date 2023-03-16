import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Mojave2.png";
import Auth from "../../utils/auth";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../StateProvider";
import "./Header.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [{ cart, list }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div>
        <Link to="/">
          <img className="header_logo" src={Logo} alt="Mojave Logo" />
        </Link>
      </div>
      <div className="header_search">
        <input className="search_input" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to="/login">
          <div className="header_option">
            <span className="header_optionl1">Hello Guest</span>
            <span className="header_optionl2">Sign In</span>
          </div>
        </Link>
        <Link to="/wishlist">
          <div className="header_option">
            <span className="header_optionl1">Your</span>
            <span className="header_optionl2">Wishlist</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionl1">Returns</span>
            <span className="header_optionl2">& Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header_optionCart">
            <CartIcon />
            <span className="header_optionl2 header_cartCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
      {/* <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div> */}
    </div>
  );
};

export default Header;
