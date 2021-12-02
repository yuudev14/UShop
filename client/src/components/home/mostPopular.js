import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MostPopular = () => {
  const [mostPopularProducts, setMostPopularProducts] = useState([]);

  const getPopularProducts = async () => {
    try {
      const products = await axios.get("/ushop/most-popular-products");
      setMostPopularProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularProducts();
  }, []);
  return (
    <div className="mostPopular previewContainer">
      <h1>Most Popular</h1>
      <div className="productList">
        {mostPopularProducts.map((prod) => (
          <Link to={`/product/${prod.product_id}`}>
            <div className="product">
              <div className="productImg">
                <img src={prod.images} alt="images" />
              </div>
              <h3>{prod.product_name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
