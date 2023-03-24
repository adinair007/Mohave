import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Mojave2.png";
import Auth from "../../utils/auth";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../StateProvider";
import "./Header.css";

export default function Header({ searchValue, searchHandler }) {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [{ cart }, dispatch] = useStateValue();

  const navRef = useRef();

  const toggleMobileMenu = () => {
    navRef.current.classList.toggle("open");
  };

  // const onChange = (event) => {
  //     setValue(event.target.value);
  // };

  // const onSearch = (searchTerm) => {
  //     setValue(searchTerm);
  //     console.log("search", searchTerm);
  // };

  // const dropDownStyle = data.length ? { display: 'block' } : { display: 'none' }

  // const [keyword, setKeyword] = useState('')

  //    const searchHandler = (e) => {
  //     e.preventDefault()

  //     if(keyword.trim()) {
  //       history.push(`/search/${keyword}`)
  //     } else {
  //       history.push('/')
  //     }
  //    }
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="header">
          <div>
            <Link to="/">
              <img className="header_logo" src={Logo} alt="Mojave Logo" />
            </Link>
          </div>
          <div className="search_bar">
            <form className="header_search">
              {/* <Search /> */}
              <input
                className="search_input"
                name="productSearch"
                placeholder="Search Product"
                value={searchValue}
                onChange={(e) => searchHandler(e.target.value)}
              />
            </form>
          </div>
          <nav>
            <div className="header_nav">
              <Link to="/" onClick={() => Auth.logout()}>
                <div className="header_option">
                  <span className="header_optionl1">Hello Friend!</span>
                  <span className="header_optionl2">Sign Out</span>
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
          </nav>
          {/* Mobile Menu */}
          <nav ref={navRef}>
            <div onClick={toggleMobileMenu} className="hamburger_menu">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <ul className="mobile_menu">
                <li>
                  <Link to="/wishlist">
                    <span className="mobile_option">Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link to="/orders">
                    <span className="mobile_option">Returns & Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/checkout">
                    <span className="mobile_option">
                      <span className="cart_icon">
                        Cart <CartIcon />
                        <span className="header_cartCount">{cart?.length}</span>
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => Auth.logout()}>
                    <span className="mobile_option">Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div>
            <Link to="/">
              <img className="header_logo" src={Logo} alt="Mojave Logo" />
            </Link>
          </div>
          <div className="search_bar">
            <form className="header_search">
              {/* <Search /> */}
              <input
                className="search_input"
                name="productSearch"
                placeholder="Search Product"
                value={searchValue}
                onChange={(e) => searchHandler(e.target.value)}
              />
            </form>
          </div>
          <nav>
            <div className="header_nav">
              <Link to="/login">
                <div className="header_option">
                  <span className="header_optionl1">Hello Guest!</span>
                  <span className="header_optionl2">Sign In</span>
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
          </nav>
          {/* Mobile Menu */}
          <nav ref={navRef}>
            <div onClick={toggleMobileMenu} className="hamburger_menu">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <ul className="mobile_menu">
                <li>
                  <Link to="/checkout">
                    <span className="mobile_option">
                      <span className="cart_icon">
                        Cart <CartIcon />
                        <span className="header_cartCount">{cart?.length}</span>
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <span className="mobile_option">Sign In</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }

  return <div>{showNavigation()}</div>;
}
