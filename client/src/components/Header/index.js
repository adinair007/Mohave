import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Mojave2.png";
import Auth from "../../utils/auth";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCart"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
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
        <div className="header_option">
          <span className="header_optionl1">Hello Guest</span>
          <span className="header_optionl2">Sign In</span>
        </div>
        <div className="header_option">
          <span className="header_optionl1">Returns</span>
          <span className="header_optionl2">& Orders</span>
        </div>
        <div className="header_optionCart">
          <CartIcon />
          <span className="header_optionl2 header_cartCount">0</span>
        </div>
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