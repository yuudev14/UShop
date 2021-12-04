import React, { useEffect } from "react";
import "../styles/buyPage/categoryProducts.scss";
import HomeProductList from "../components/home/homeProductList";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategoryProductsAction } from "../reduxStore/actions/ushopAction";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryProductsAction("popular", category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="categoryProducts">
      <HomeProductList />
    </div>
  );
};

export default CategoryProducts;
