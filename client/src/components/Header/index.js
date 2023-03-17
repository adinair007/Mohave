import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Mojave2.png";
import Auth from "../../utils/auth";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../StateProvider";
import "./Header.css";


const data = require("./MOCK_DATA.json");




export default function Header() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        console.log("search", searchTerm);
    };
    const [{ cart }, dispatch] = useStateValue();

    const dropDownStyle = data.length ? { display: 'block' } : { display: 'none' }



    return (
        <div className="header">
          <div>
              <Link to="/">
                  <img className="header_logo" src={Logo} alt="Mojave Logo" />
              </Link>
          </div>

          <div className="header_search">
              <input className="search_input" type="text" value={value} onChange={onChange} />
              {/* <SearchIcon className="header_searchIcon" /> */}
              <button onClick={() => onSearch(value)}> Search </button>
              <div className="dropdown" style={dropDownStyle}>
                {data
                    .filter((item) => {
                        const searchTerm = value.toLowerCase();
                        const product = item.Item_name.toLowerCase();

                        return ( searchTerm && product.startsWith(searchTerm) &&
                            product !== searchTerm
                        );
                    })
                    .slice(0, 10)
                    .map((item) => (
                        <div 
                          onClick={() => onSearch(item.Item_name)}
                          className="dropdown-row"
                          key={item.Item_name}>

                            {item.Item_name}
                        </div>
                    ))}
            </div>   
          </div>
         
          <div className="header_nav">
              <Link to="/login">
                  <div className="header_option">
                      <span className="header_optionl1">Hello Guest</span>
                      <span className="header_optionl2">Sign In</span>
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
        </div> 
    )

};

























// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/Mojave2.png";
// import Auth from "../../utils/auth";
// import SearchIcon from "@material-ui/icons/Search";
// import CartIcon from "@material-ui/icons/ShoppingCart";
// import { useStateValue } from "../../StateProvider";
// import "./Header.css";

// const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

//   const [{ cart }, dispatch] = useStateValue();

//   return (
//     <div className="header">
//       <div>
//         <Link to="/">
//           <img className="header_logo" src={Logo} alt="Mojave Logo" />
//         </Link>
//       </div>
//       {/* <div className="header_search">
//         <input className="search_input" type="text" />
//         <SearchIcon className="header_searchIcon" />
//       </div> */}



      
//       <div className="header_nav">
//         <Link to="/login">
//           <div className="header_option">
//             <span className="header_optionl1">Hello Guest</span>
//             <span className="header_optionl2">Sign In</span>
//           </div>
//         </Link>
//         <Link to="/orders">
//           <div className="header_option">
//             <span className="header_optionl1">Returns</span>
//             <span className="header_optionl2">& Orders</span>
//           </div>
//         </Link>
//         <Link to="/checkout">
//           <div className="header_optionCart">
//             <CartIcon />
//             <span className="header_optionl2 header_cartCount">
//               {cart?.length}
//             </span>
//           </div>
//         </Link>
//       </div>
//       {/* <div>
//           {Auth.loggedIn() ? (
//             <>
//               <Link className="btn btn-lg btn-info m-2" to="/me">
//                 {Auth.getProfile().data.username}'s profile
//               </Link>
//               <button className="btn btn-lg btn-light m-2" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link className="btn btn-lg btn-info m-2" to="/login">
//                 Login
//               </Link>
//               <Link className="btn btn-lg btn-light m-2" to="/signup">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div> */}
//     </div>
//   );
// };

// export default Header;