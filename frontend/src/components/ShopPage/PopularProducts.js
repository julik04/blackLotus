import { useState, useEffect } from "react";
import { SERVER_LOCATION } from "../Constants/Server";
import CardProduct from "./CardProduct";

function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_LOCATION}/products/popular`)
      .then((res) => res.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <>
      {popularProducts.map((product, index) => (
        <CardProduct
          key={index}
          title={product.title}
          price={product.price}
          productSRC={SERVER_LOCATION + product.image}
        />
      ))}
    </>
  );
}
export default PopularProducts;
