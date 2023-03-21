
import { useEffect, useState, useMemo } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import Product from "../Product";
import desert from '../../assets/Desert.jpg'

export default function Search() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");

  const searchProducts = useMemo(() => {
    console.log("PRODUCTS FUNCTION 1:", searchTerm);
    if (searchTerm === "") {
      console.log("PRODUCTS FUNCTION 2:", searchTerm);
      return null;
    } else {
      console.log("PRODUCTS FUNCTION 3:", searchTerm);
      return data.products.filter((product) => {
        const searchFields =
          `${product.name} ` +
          `${product.price} ` +
          `${product.image}`;
        return searchFields.includes(searchTerm.toLowerCase());
      });
    }
  }, [searchTerm]);

  return (
    <div className="p-6">
      <form className="flex flex-col w-72">
        <input
          className="border p-1 px-3 my-3"
          name="searchMovie"
          placeholder="Search Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchProducts?.length ? (
        <div style={{background: 'white'}}>
          {searchProducts.map(product => (
            <div>{product.name}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}













