import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Desert from "../../assets/Desert.jpg";
import Header from "../../components/Header";
import Product from "../../components/Product";

import { QUERY_ALL_PRODUCTS } from "../../utils/queries";

import "./Home.css";

function Home() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [ searchTerm, setSearchTerm ] = useState("");

  const productData = searchTerm?.length > 2? data.products.filter((product) => {
    const searchFields =
      `${product.name.toLowerCase()} ` +
      `${product.price} ` +
      `${product.image}`;
    return searchFields.includes(searchTerm.toLowerCase());
  }) : data?.products;

  return (
    <div>
      <Header searchValue={searchTerm} searchHandler={setSearchTerm} />
      <div className="home">
        <div className="home_container">
          <img className="home_image" src={Desert} alt="Desert art" />
          <div className="home_row">
            {loading ? (
              <div>Loading products</div>
            ) : (
              productData.map((product) => (
                <Product
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  image={product.image}
                  rating={5}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
