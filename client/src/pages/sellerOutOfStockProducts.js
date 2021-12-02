import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOutOfStockProductsAction,
  resetSellerProductsAction,
} from "../reduxStore/actions/sellerAction";
import SellerProduct from "../components/sellerViewProduct/product";
import "../styles/sellerPage/outOfStock.scss";

const SellerOutOfStockProducts = () => {
  const outOfStockProducts = useSelector((state) => state.sellerProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOutOfStockProductsAction());
    return () => {
      dispatch(resetSellerProductsAction());
    };
  }, []);
  return (
    <div className="sellerOutOfStockProducts">
      <h1>Out of Stock</h1>
      <div className="ProductListContainer">
        {outOfStockProducts.map((prod) => (
          <SellerProduct data={prod} />
        ))}
      </div>
    </div>
  );
};

export default SellerOutOfStockProducts;
