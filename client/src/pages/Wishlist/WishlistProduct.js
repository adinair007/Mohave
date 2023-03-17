import React from "react";
import { useStateValue } from "../../StateProvider";
import "./WishlistProduct.css";

const WishlistProduct = ({ id, image, title, price, rating }) => {
  
  const [{ list }, dispatch] = useStateValue();

  const removeFromList = () => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      id: id,
    });
  };

  const addToCart = () => {
    //dispatch the item into cart/data layer
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return( 
  <div className="wishlistProduct">
    <img className="wishlistProduct_image" src={image} />
    <div className="wishlistProduct_info">
        <p className="wishlistProduct_title">{title}</p>
        <p className="wishlistProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="wishlistProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <div>
        <button className="cart_button" onClick={addToCart}>Add to Cart</button>
        </div>
        <button className="remove_button" onClick={removeFromList}>Remove from Wishlist</button>  
    </div>
  </div>
  );
};

export default WishlistProduct;
