import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Product.css";

function Product({ id, title, price, image, rating }) {
  const [{ state }, dispatch] = useStateValue();
  const addToBasket = () => {
    //dispatch the item into basket/data layer
    dispatch({
      type: "ADD_TO_BASKET",
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
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
