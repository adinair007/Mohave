import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Product.css";

function Product({ id, title, price, image, rating }) {
  const [{ cart, list }, dispatch] = useStateValue();
  console.log("IMAGE?", image);
  console.log("this is the cart >>>", cart);
  console.log("this is the wishlist >>>", list);
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
  const addToWishlist = () => {
    //dispatch the item into cart/data layer
    dispatch({
      type: "ADD_TO_WISHLIST",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} />
      <button
        className="cart_button"
        onClick={addToCart}
        style={{ cursor: "pointer" }}
      >
        Add to Cart
      </button>
      <button
        className="list_button"
        onClick={addToWishlist}
        style={{ cursor: "pointer" }}
      >
        Add to Wishlist
      </button>
    </div>
  );
}

export default Product;
