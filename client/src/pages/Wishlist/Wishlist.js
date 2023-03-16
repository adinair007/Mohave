import React from "react";
import "./Wishlist.css";
import Header from "../../components/Header";
import { useStateValue } from "../../StateProvider";
import WishlistProduct from "./WishlistProduct";

const Wishlist = (event) => {
  const [{ list }, dispatch] = useStateValue();

  return (
    <div>
      <Header />
      <div className="wishlist">
        <div className="wishlist__left">
          <div>
            <h2 className="wishlist__title">Your Wishlist</h2>

            {list.map((item) => (
              <WishlistProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
