import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopCategory = () => {
  const [topCategoryProducts, setTopCategoryProduct] = useState([]);

  const getTopCategoryProduct = async () => {
    try {
      const products = await axios.get("/ushop/top-category-product");
      setTopCategoryProduct(products.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopCategoryProduct();
  }, []);
  return (
    <div className="bestSellersInTopCategory previewContainer">
      <h1>
        Most Popular {topCategoryProducts[0] && topCategoryProducts[0].category}
      </h1>
      <div className="productList">
        {topCategoryProducts.map((prod) => (
          <Link to={`/product/${prod.product_id}`} key={prod.product_id}>
            <div className="product">
              <div className="productImg">
                <img src={prod.images} alt="product" />
              </div>
              <h3>{prod.product_name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategory;
