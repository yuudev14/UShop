import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularCategory = () => {
  const [mostPopularCategories, setMostPopularCategories] = useState([]);

  const getPopularCategories = async () => {
    try {
      const categories = await axios.get("/ushop/most-popular-categories");
      setMostPopularCategories(categories.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularCategories();
  }, []);
  return (
    <div className="popularCategory">
      <h1>Popular Categories</h1>

      <div className="categoryList">
        {mostPopularCategories.map((category, i) => (
          <Link
            to={`/category/${category.category_name}`}
            className={
              i === 0
                ? "mostPopularCategory categoryContent"
                : "category categoryContent"
            }>
            <h3>{category.category_name}</h3>
            <p>{category.products} products</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
